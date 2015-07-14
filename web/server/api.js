var express = require("express");
var router = express.Router();

router.get("/discussions", function(req, res){
  var data = [
    {"id": "1", "topic": "Making progress on things", "numberOfComments": 34},
    {"id": "2", "topic": "The Second of many to come", "numberOfComments": 44}
  ];
  res.json(data);
});

module.exports.routes = router;
