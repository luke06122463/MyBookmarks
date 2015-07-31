'use strict';
angular.module('bsm.login').provider('UserService', [
  '$httpProvider',
  function ($http) {
    //private properties
    var user = {
        isLoggedIn: false,
        isInitialized: false,
        userId: undefined,
        tenantId: undefined,
        userName: '',
        firstName: '',
        lastName : '',
        logonName: '',
        role: undefined,
        userPreference: undefined
      };
    var userPath = '/auth/preference';
    var timeFormat = 'h:mm a';
    var dateStructure = 'MM/DD/YYYY';
    var useProgressive = true;
    this.$get = [
      '$http',
      function ($http) {
        return {
          user: user,
          userPath: userPath,
          timeFormat: timeFormat,
          dateStructure: dateStructure,
          useProgressive: useProgressive,
          getUser: function () {
            return user;
          },
          setUser: function (isLoggedIn, userObj) {
            console.log("UserService:: Set user for " + userObj.user_name);
            user.isLoggedIn = isLoggedIn;
            if(isLoggedIn){
              user.isInitialized = isLoggedIn;
              user.userId = userObj.user_id;
              user.userName = userObj.user_name;
              user.firstName = userObj.first_name;
              user.lastName = userObj.last_name;
              user.logonName = userObj.logon_name;
              user.role = userObj.user_roles;
            }
          },
          getUserPath: function () {
            return userPath;
          },
          setUserPath: function (_userPath) {
            userPath = _userPath;
          },
          getLoggedInUser: function () {
            var options = {
                method: 'GET',
                url: userPath
              };
            return $http(options);
          },
          isUserLoggedIn: function () {
            return user.isLoggedIn;
          },
          isUserInitialized: function () {
            return user.isInitialized;
          },
          getUserRole: function () {
            return user.role;
          },
          getUserName: function () {
            return user.userName;
          },
          getUserId: function () {
            return user.userId;
          },
          getTenantId: function () {
            return user.tenantId;
          },
          clearUser: function () {
            user.isLoggedIn = false;
          },
          getTimeFormatPref: function () {
            return timeFormat;  //this will be loaded from prefs
          },
          setTimeFormatPref: function (_timeFormat) {
            timeFormat = _timeFormat;
          },
          getDateStructurePref: function () {
            return dateStructure;
          },
          setDateStructurePref: function (_dateStructure) {
            dateStructure = _dateStructure;
          },
          useProgressiveFormatPref: function () {
            return useProgressive;
          },
          setProgressiveFormatPref: function (_useProgressive) {
            useProgressive = _useProgressive;
          }
        };
      }
    ];
  }
]);