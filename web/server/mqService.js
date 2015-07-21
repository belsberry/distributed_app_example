var amqp = require("amqplib");


module.exports = function MessageQueueService(){

  var self = this;
  var EXCHANGE_NAME = "discussionEvents";
  var EXCHANGE_OPTIONS  = { durable: false };
  var QUEUE_DEFAULT_OPTIONS = { durable: false, autoDelete: true };
  self.events = {};
  self.queues = [];

  self.connection = null;
  self.channel = null;

  self.on = function(evnt, callback){
    self.events[evnt] = callback;
  }

  function subscribeQueue(evnt, channel, callback){
    var queueName = "web-" + evnt;
    channel.assertQueue(queueName, QUEUE_DEFAULT_OPTIONS).then(function(){
      return channel.bindQueue(queueName, EXCHANGE_NAME, evnt);
    }).then(function(){
      return channel.consume(queueName, function(msg){
        callback(msg.content.toString());
      });
    });
  }

  function createConnectionAndChannel(){
    return amqp.connect("amqp://localhost").then(function(conn){
      return conn.createChannel();
    });
  }

  self.connect = function(callback){
    createConnectionAndChannel().then(function(channel){
        console.log("connection ready");
        channel.assertExchange(EXCHANGE_NAME, "fanout", EXCHANGE_OPTIONS).then(function(){
          for(var evnt in self.events){
            subscribeQueue(evnt, channel, self.events[evnt]);
          }
          callback();
        }, function(err)
        {
          console.log(err);
        });
      }, function(err) { console.log(err); });

  }


  self.sendCommand = function(command, data, callback){
    createConnectionAndChannel().then(function(channel){
      var buf = new Buffer(data);
      var ok = channel.sendToQueue(command, buf);

      channel.close().then(function(){channel.connection.close();});

    });

  }

}
