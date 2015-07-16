var gulp = require("gulp");
var del = require("del");
var gls = require("gulp-live-server");

var paths = {
  lib: [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/knockout/dist/knockout.js",
    "bower_components/socket.io-client/socket.io.js"
  ],
  code:[
    "public/scripts/**/*.js",
    "server/**/*.js",
    "app.js"
  ]
}

gulp.task("scripts", function(callback){
  del(["public/lib"], function(){
    gulp.src(paths.lib)
      .pipe(gulp.dest("public/lib"));
  });
});

gulp.task("dev-server", function(){
  var server = gls.new("app.js");
  server.start();
  gulp.watch(paths.code, function(){
    console.log("reloading server");
    server.stop().then(function(){server.start();});
  })
});

gulp.task("default", ["scripts", "dev-server"]);
