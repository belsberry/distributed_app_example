var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var api = require("./server/api");
var SocketEventApi = require("./server/socketEvents");
var mqService = require("./server/mqService");
var MongoClient = require("mongodb").MongoClient;


var messageQueue = new mqService();
var socketEventEmitter = new SocketEventApi(messageQueue, io);

var connectionString = process.ENV.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/discussions";

var server;
var db;

app.use(function(req, res, next){
  req.db = db;
  next();
});


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.use("/api", api.routes);
app.use("/bower_components", express.static("bower_components"));
app.use("/public", express.static("public"));


MongoClient.connect(connectionString, function(err, databaseConnection){
  db = databaseConnection;
  messageQueue.connect();

  io.socketEventEmitter = socketEventEmitter;
  io.on("connection", function(socket){
    io.socketEventEmitter.registerSocket(socket);
  });

  server = http.listen(process.env.PORT || 8000, function(){
    console.log("server listening on port %s ", server.address().port);
  });
});
