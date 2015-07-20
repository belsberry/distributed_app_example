var amqp = require("amqp");


module.export = function MessageQueueService(){

  var self = this;
  self.events = {};
  self.queues = [];

  self.on = function(evnt, callback){
    if(self.connection){
      self.queues.push(self.connection.queue(evnt, callback));
    }
    self.events[evnt] = callback;
  }

  self.connection = null;

  function subscribeQueue(evnt, callback){
    //TODO create the exchange and bind a unique queue to it.
    self.connection.queue(evnt, function(queue){
      queue.subscribe(function(message, headers, deliveryInfo, data){
        data = JSON.parse(data);
        callback(data);
      });
    });
  }

  self.connect = function(){
    if(!self.connection){
      self.connection = amqp.createConnection({url: "localhost"});
      self.connection.on("ready", function(){
        for(var evnt in self.events){
          self.queues.push(subscribeQueue(evnt, self.events[evnt]));
        }
      });
    }
  }

  self.sendCommand = function(command, data, callback){
    if(!self.connection){
      callback("connection is not open. Call connect first");
    }

    self.connection.publish(command, JSON.stringify(data), {}, callback);
  }

}
