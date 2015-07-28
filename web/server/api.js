var express = require("express");
var router = express.Router();
var assert = require("assert");

router.get("/discussions", function(req, res){
  var discussions = req.db.collection("discussions");
  discussions.find({}).toArray(function(err, docs){
    assert.equal(err, null);
    res.json(docs);
  });
});


module.exports.routes = router;
