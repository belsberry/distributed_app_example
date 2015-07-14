var app = app || {};
app.discussions = (function(){
  function DiscussionsVM(){
    var self = this;
    self.socket = io();
    self.discussions = ko.observableArray([]);

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
    function registerPushCallbacks(){
      self.socket.on("newDiscussion", function(discussion){
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
