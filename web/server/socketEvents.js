var uuid = require("node-uuid");

module.exports = function SocketEventPublisher(messageQueue, socketHub){
  var self = this;
  self.socketHub = socketHub;
  self.mq = messageQueue;
  self.sockets = [];
  self.socketEvents = {
    "addDiscussion": function(discussion){
      var discussion = JSON.parse(discussion);
      var newDiscussion = {
        topic: discussion.topic,
        id: uuid.v4(),
        numberOfComments: 0
      };
      self.mq.sendCommand("addDiscussion", newDiscussion,  function(err){
        console.log(err);
      });
    }
  };

  self.mqEvents = {
    "discussionAdded": function (discussion){
      self.socketHub.emit("discussionAdded", discussion);
    }
  };


  self.registerSocket = function(socket){
    for(var evnt in self.socketEvents){
      socket.on(evnt, self.socketEvents[evnt]);
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
