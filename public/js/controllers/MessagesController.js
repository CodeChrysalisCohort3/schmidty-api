app.controller('MessagesController', ['$scope', '$http', function ($scope, $http) {  
  $scope.user = {};
  $scope.users = [];
  $scope.channels = [];
  $scope.messageTarget = null;
  $scope.currentChannel = null;
  $scope.currentUser = null;
  $scope.usernameRecieved = false;
  $scope.currentMessages = [];

  var getUsers = function () {
    $http.get("http://localhost:3000/api/users").then(function (response) {
        $scope.users = response.data;
    });
  };

  var getChannels = function () {
    $http.get("http://localhost:3000/api/channels").then(function (response) {
        $scope.channels = response.data;
    });
  };

  $scope.signIn = function (e) {
    //post the new user and then get all the existing users and channels
    var postData = { username: $('#username-input')[0].value };
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/users',
      data: postData,
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      $scope.usernameRecieved = true;
      $scope.user = response.data;
      getUsers();
      getChannels();
    });
  };

  $scope.refreshUsers = () => getUsers();
  $scope.refreshChannels = () => getChannels();

  $scope.sendMessage = function (channelId) {
    //post message to server and refresh the messages displayed
    if($scope.messageTarget === 'user'){

      var postData = { fromId: $scope.user.id, message: $('#messageArea')[0].value };
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users/' + $scope.currentUser.id + '/messages',
        data: postData,
        headers: {'Content-Type': 'application/json'}
      }).then(function (response) {
        $scope.currentMessages = response.data;
        $('#messageArea')[0].value = '';
      });

    }else if($scope.messageTarget === 'channel'){

      var postData = { fromId: $scope.user.id, message: $('#messageArea')[0].value };
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/channels/' + $scope.currentChannel.id + '/messages',
        data: postData,
        headers: {'Content-Type': 'application/json'}
      }).then(function (response) {
        $scope.currentMessages = response.data;
        $('#messageArea')[0].value = '';
      });
    }
  };

  $scope.getUser = function (userIndex) {
    $scope.messageTarget = 'user';
    $scope.currentUser = $scope.users[userIndex];
    $http.get("http://localhost:3000/api/users/" + $scope.currentUser.id + '/messages?fromId=' + $scope.user.id)
    .then(function (response) {
      $scope.currentMessages = response.data;
    });

  };

  $scope.getChannel = function (channelIndex) {
    $scope.messageTarget = 'channel';
    $scope.currentChannel = $scope.channels[channelIndex];
    $http.get("http://localhost:3000/api/channels/"+ $scope.currentChannel.id)
    .then(function (response) {
      $scope.currentMessages = response.data;
    });
  };

}]);
