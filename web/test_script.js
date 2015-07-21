var MessageQueueService = require("./server/mqService");

var service = new MessageQueueService();

service.sendCommand("addDiscussion", "Hi There");
