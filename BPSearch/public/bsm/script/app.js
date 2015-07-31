'use strict';

angular
  .module('bsm.gui', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'jm.i18next',
    'bsm.login',
    'bsm.service',
    'bsm.provider'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: '/bsm/views/admin.html'
      })
      .when('/login', {
        templateUrl: 'bsm.login.login-flatUiPage.html',//,'bsm.login.login-loginPage.html'
        controller: 'LoginController'//'AdminController'
      })      
      .when('/home', {
        templateUrl: '/bsm/views/admin.html'
      })      
      .when('/history', {
        templateUrl: '/bsm/views/admin.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .constant('AUTH_EVENTS',{
    LOGIN_SUCCESS: 'user:loginSuccess',
    LOGIN_FAILED: 'user:loginFailed',
    LOGIN_INITIATED: 'user:loginInitiated',
    LOGOUT_SUCCESS: 'user:logoutSuccess',
    LOGOUT_FAILED: 'user:logoutFailed',
    USER_LOGIN: 'user:login',
    USER_LOGOUT: 'user:logout',
    USER_AUTHENTICATION: 'user:authentication',
    ACCESS_DENY: 'user:accessDeny',
    AUTHENTICATION_EXPIRED: 'user:authenticationExpired'
  })
  .constant('URL_DICT',{
    CHECK_AUTHENTICATION: 'login.checkAuthentication',
    USER_LOGIN: 'login.userLogin',
    USER_LOGOUT: 'login.userLogout'
  })
  .run([
    '$rootScope', 
    'UserService', 
    'LocationService',
    'AUTH_EVENTS', 
    '$route',
    function ($rootScope, userService, locationService, AUTH_EVENTS, $route){
      var isSupported = true;//browser.isSupportedBrowser();

      $rootScope.$on('$routeChangeStart', function(e, curr, prev){
        var node = curr;
        console.log("APP:: route change to ==> "+locationService.getLocationHash());

        //check whether dpsearch support current browser
        if(!isSupported){
          e.preventDefault();
        }else{
          if(node.originalPath == '/login'){
            //do nothing. show the login page for the user to login
            console.log("APP:: Do nothing, for user wants to visit login page");
          }else if(!userService.isUserInitialized()){
            /* Check whether user has logged in or not. If user has loggin in then redirect him to where he wants to go. Otherwise, go to login page
             *  So the scenario for this case are following
             *  1. access the page by specifing the url, eg. http://localhost/admin, http://localhost/admin#/option
             *  2. refresh the page, eg. F5 or clear the browser
             */
            console.log("APP:: try to broadcast the Authentication Event since user has not logged in yet");
            /* Prevent user from accessing the view he requests since we donot whether he has logged in or not
            * So that we wouldn't see the changing from what user requests to the login view
            */
            e.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.USER_AUTHENTICATION, node.originalPath);
          }else{
            console.log("APP:: user has logged in because isUserInitialized is true. let it visit =>" + node.originalPath);
          }
        }
      });
      
      if(!isSupported){
        alert("Sorry, we dont't support browser("+browser.getBrowserName()+", "+browser.getBrowserVersion()+")");
        $route.reload();//return;
      }
    }
  ]);
