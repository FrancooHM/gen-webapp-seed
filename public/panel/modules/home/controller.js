// angular.module( 'BeerTapsPanel.home', [
// 'auth0'
// ])
panel.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store, $rootScope ) {

  $rootScope.auth = auth;

});
