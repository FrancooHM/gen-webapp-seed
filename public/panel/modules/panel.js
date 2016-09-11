var panel = angular.module('BeerTapsPanel', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);
panel.config(function myAppConfig($routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'modules/home/index.html',
      pageTitle: 'Homepage',
      requiresLogin: true
    })
    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'modules/login/index.html',
      pageTitle: 'Login'
    })
    .when('/styles', {
      controller: 'StylesCtrl',
      templateUrl: 'modules/styles/index.html',
      pageTitle: 'Styles'
    })
    .when('/new-style', {
      controller: 'NewStyleCtrl',
      templateUrl: 'modules/new-style/index.html',
      pageTitle: 'New style'
    })
    .when('/providers', {
      controller: 'ProvidersCtrl',
      templateUrl: 'modules/providers/index.html',
      pageTitle: 'Providers'
    })
    .when('/new-provider', {
      controller: 'NewProviderCtrl',
      templateUrl: 'modules/new-provider/index.html',
      pageTitle: 'New provider'
    })
    .when('/new-beer', {
      controller: 'NewBeerCtrl',
      templateUrl: 'modules/new-beer/index.html',
      pageTitle: 'New beer'
    })
    .when('/beers', {
      controller: 'BeersCtrl',
      templateUrl: 'modules/beers/index.html',
      pageTitle: 'Beers'
    })
    .when('/stock', {
      controller: 'StockCtrl',
      templateUrl: 'modules/stock/index.html',
      pageTitle: 'Stock'
    })
    .when('/stock-beer', {
      controller: 'StockBeerCtrl',
      templateUrl: 'modules/stock-beer/index.html',
      pageTitle: 'Stock beer'
    })
    .otherwise('/', {
      controller: 'HomeCtrl',
      templateUrl: 'modules/home/index.html',
      pageTitle: 'Homepage',
      requiresLogin: true
    });

  authProvider.init({
    domain: 'genosha.auth0.com',
    clientID: 'aiPkcx7oPPp4IFVolNHsI62B9j7gJu5L',
    loginUrl: '/login'
  });

  //Called when login is successful
  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $location.path('/');
  });

  authProvider.on('loginFailure', function() {
    alert("Error");
  });

  authProvider.on('authenticated', function($location) {
    console.log("Authenticated");

  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  };

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
});
panel.run(['auth', function(auth) {
  // This hooks all auth events to check everything as soon as the panel starts
  auth.hookEvents();
}]);
panel.run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {

    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          //Re-authenticate user if token is valid
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});
panel.controller('PanelRootCtrl', function PanelRootCtrl($scope, $rootScope, $location, store, auth) {
  $rootScope.auth = auth;

  $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
    if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 BeerTapsPanel';
    }
  });

  $rootScope.logout = function() {
    console.debug("auth.signout() running...");
    $rootScope.auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  };

  $(".button-collapse").sideNav();
});
