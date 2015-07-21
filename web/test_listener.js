var MessageQueueService = require("./server/mqService");

var service = new MessageQueueService();

service.on("discussionAdded", function(data){
  console.log(data);
});

service.connect(function(){});
