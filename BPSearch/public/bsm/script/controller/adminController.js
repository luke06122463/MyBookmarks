
var bsmApp = angular.module('bsm.gui');
//searchApp.configu(func)
bsmApp.controller('AdminController', [
	'$scope', 
	'$route',
	'$rootScope', 
    'LocationService',
	'LoginService',
	'UserService',
	'AUTH_EVENTS',
	'RemoteProxy',
	'RemoteUrl', 
	function($scope, $route, $rootScope, locationService, loginService, userService, AUTH_EVENTS, remoteProxyService, remoteUrlProvider){
		console.log("step into AdminController");
		//init css for the whole website
		$scope.website = {
			css: {
				color: '#515151' //grey
			},
			layout: {
				showNavigationItem: false,
				showLoginItem: true,
				showRegisterItem: true,
				showUserProfileMenu: false
			},
			user: {
				name: ''
			},
			newBookmark: {
				title: '',
				summary: '',
				url: ''
			}
		};
		$rootScope.$on(AUTH_EVENTS.USER_AUTHENTICATION, function(event, args){
			console.log('AdminController:: USER_AUTHENTICATION event'+args);
			//$scope.targetLocation = (args==''?$scope.targetLocation:args);
			locationService.setTargetLocation(args);
			loginService.doAuthenticationCheck().success($scope.handleAuthenticationSuccess).error($scope.handleAuthenticationFailure);
		});

		$scope.handleAuthenticationSuccess = function(data) {
	        if(data.has_login){
	        	console.log("AdminController:: authentication has passed.");
	        	if(userService.isUserLoggedIn() && userService.isUserInitialized()){
	        		// since user has logged in, the page has finished its draw and all menus are ready, so do not prevent user's request
	        		console.log("AdminController:: userService is not empty and the drawing of the page has been ready");
		        }else{
		        	/* userService is unintialized or unloggedin but user can pass authentication, so it must be:
		        	*	1. refresh the current page after he logged in
		        	*	2. open a new tab after he logged in
		        	* So load the user information back to useService and do not prevent user's request
		        	*/
		        	console.log("AdminController:: userService is empty and load the information for userService");
		            userService.setUser(true, data.login_data);
		            // inform AngularJS to draw the page
		            $rootScope.$broadcast(AUTH_EVENTS.LOGIN_SUCCESS, userService.getUser());
		        }
	            //$location.path('/option');
	        }else{
	        	console.log("AdminController:: authentication failed to passed.");
	        	if(userService.isUserInitialized()){
	        		// user authentication is expired due to some reason. 
	        		// todo: show relogin dailog
	        		console.log("AdminController:: authentication has been expired and show the relogin dailog");
	        	}else{
	        		// it's user's first visit to this page. redirect to login page.
	        		console.log("AdminController:: user has not logged in. redirect him to login page");
		            userService.setUser(false, {});
		            locationService.path('/login');
					$scope.website.css.color= '#515151'; //white
		        }
	        }
		};

		$scope.handleAuthenticationFailure = function(){
			console.log('AdminController:: something is wrong.');
		}

		/*
		 * if login successfully, reset the profile- menu and navigation-menu
		 */
		$rootScope.$on(AUTH_EVENTS.LOGIN_SUCCESS, function(event, args){

			// change the background to white
			$scope.website.css.color= '#fff'; //white

			$scope.website.layout.showNavigationItem=true;
			$scope.website.layout.showLoginItem=false;
			$scope.website.layout.showRegisterItem=false;
			$scope.website.layout.showUserProfileMenu=true;

			console.log("AdminController:: the page will be redirected to "+locationService.getTargetLocation());
			//$route.current = $scope.targetLocation;
            locationService.pathToTargetLocation();
			$route.reload();

			//console.log(args);
			if(args.isLoggedIn){
				//get the user name
				var greetName = args.userName;
				if((typeof args.firstName != 'undefined') && (typeof args.lastName != 'undefined') && (args.firstName != '') && (args.lastName != ''))
					greetName = args.lastName + " " + args.firstName
				$scope.website.user.name = greetName;
			}

		});

		$scope.logout = function(){
			loginService.doLogout();
			locationService.path('/login');
			$scope.website.css.color= '#515151'; //white
		}

		$scope.createNewBookmark = function(){
			console.log($scope.website.newBookmark);
			var urlObj = remoteUrlProvider.getUrl("bookmarks.createBookmarks", false);
			remoteProxyService[urlObj.action]({
		    	"url": urlObj.url, 
		    	"request": $scope.website.newBookmark,
		    	//"response": getSourceResponse, 
		    	"success": function(data){
		    		console.log(data);
		    		$scope.website.newBookmark.title = '';
		    		$scope.website.newBookmark.summary = '';
		    		$scope.website.newBookmark.url = '';
		    	}
		    });
		}

	}
]);

