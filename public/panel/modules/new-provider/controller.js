panel.controller('NewProviderCtrl', function NewProviderCtrl($scope, auth, $http, $location, store, $rootScope) {

  $rootScope.auth = auth;
  $scope.postBeerStyle = postBeerStyle;
  var postProvicerUrl = "/provider";

  function postBeerStyle() {
    $http.get(postProvicerUrl, $scope.provider).then();
  }

  function callbackHandler(res) {
    console.log("HEADERS: ");
    console.log(res.headers);
    console.log("STATUS: ");
    console.log(res.status);
    if (res.status == 500) {
      if (res.data.err) {
        console.warn(res.data.err);
      } else {
        console.warn("No error message...");
      }
    }
    if (res.status == 200) {
      if (res.data.err) {
        console.log("DATA: ");
        console.log(res.data);
      } else {
        console.warn("No data...");
      }
    }
    return false;
  };

});
