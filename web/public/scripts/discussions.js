var app = app || {};
app.discussions = (function(){
  function DiscussionsVM(){
    var self = this;
    self.socket = io();
    self.discussions = ko.observableArray([]);
    self.newDiscussion = ko.observable({});
    function loadDiscussions(){
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/api/discussions",
        cache: false,
        success: function(response){
          self.discussions(response);
        },
        failure: function(response){
          alert(response);
        }
      });
    }

    self.addDiscussion = function(){
      self.socket.emit("addDiscussion", JSON.stringify(self.newDiscussion()));
      self.newDiscussion({});
    }

    function registerPushCallbacks(){
      self.socket.on("discussionAdded", function(discussion){
        var discussion = JSON.parse(discussion);
        self.discussions.push(discussion);
      });
    }
    function init(){
      loadDiscussions();
      registerPushCallbacks();
    }

    init();

  }

  return {
    DiscussionsVM: DiscussionsVM
  }

})();
