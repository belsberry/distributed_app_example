
module.export = function SocketEventPublisher(messageQueue, socketHub){
  var self = this;
  self.socketHub = socketHub;
  self.mq = messageQueue;
  self.sockets = [];

  self.socketEvents = {
    "addDiscussion": function(discussion){
      self.mq.sendCommand("addDiscussion", discussion,  function(err){
        console.log(err);
      });
    }
  }

  self.mqEvents = {
    "discussionAdded": function (discussion){
      self.socketHub.emit("discussionAdded", discussion);
    }
  }


  self.registerSocket = function(socket){
    for(var evnt in self.socketEvents){
      socket.on(evnt, self.events[evnt]);
    }
    self.sockets.push(socket);
  };



  function init(){
    for(var evnt in self.mqEvents){
      self.mq.on(evnt, self.mqEvents[evnt]);
    }
  }

  init();

}
