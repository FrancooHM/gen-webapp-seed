panel.controller('StockBeerCtrl', function StockBeerCtrl($scope, auth, $http, $location, store, $rootScope) {

  $rootScope.auth = auth;

  $('select').material_select();

});
