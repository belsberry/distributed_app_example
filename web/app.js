var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var api = require("./server/api");
var SocketEventApi = require("./server/socketEvents");
var mqService = require("./server/mqService");


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.use("/api", api.routes);
app.use("/bower_components", express.static("bower_components"));
app.use("/public", express.static("public"));



var messageQueue = new mqService();
var socketEventEmitter = new SocketEventApi(messageQueue, io);

messageQueue.connect();

io.socketEventEmitter = socketEventEmitter;
io.on("connection", function(socket){
  io.socketEventEmitter.registerSocket(socket);
});


var server = http.listen(process.env.PORT || 8000, function(){
  console.log("server listening on port %s ", server.address().port);
});
