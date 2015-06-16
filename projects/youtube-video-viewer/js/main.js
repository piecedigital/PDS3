var app = angular.module("youtubeApp", []),
    key = "AIzaSyBLRbr01sfJxpsheftChVI4TeRC2zDbtD4";

app.controller("loadData", function($scope, $http) {
  $scope.word = "word";
  $scope.getChannel = function() {
    console.log($scope.channelString);
    $scope.fetch1($scope.channelString);
    $scope.channelString = "";
  }
  $scope.fetch1 = function(channel) {
    $http({
      url: "https://www.googleapis.com/youtube/v3/channels",
      method: "get",
      params: { "part" : "contentDetails", "forUsername" : channel, "key" : key }
    })
    .success(function(data, status, headers, config) {
      //console.log(data.items);
      //console.log(status);
      $scope.contentId = data.items[0].contentDetails.relatedPlaylists.uploads;
      $scope.fetch2();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
    });
  };//end $scope.fetch1
  $scope.fetch2 = function(pageToken) {
    pageToken = pageToken || "";
    $http({
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      method: "get",
      params: { "part" : "snippet", "playlistId" : $scope.contentId, "maxResults" : 20, "pageToken" : pageToken, "key" : key }
    })
    .success(function(data, status, headers, config) {
      console.log(data.items);
      //console.log(status);
      $scope.prev = data.prevPageToken || "";
      $scope.next = data.nextPageToken || "";
      $scope.items = data.items;
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
    });
  };//end $scope.fetch2
});
$(document).on("click", "a", function() {
  $("body").prepend(  "<div class='backdrop'></div>"+
                      "<div class='embed'>"+
                      "<iframe width=100% height=100% src='https://youtube.com/embed/" + $(this).data('id') + "' frameborder='0' allowfullscreen></iframe>"+
                    "</div>"+
                    "<div class='close'>&#x2716;</div>");
  return false;
});
$(document).on("click", ".close", function() {
  $(".embed, .backdrop, .close").remove();  
});