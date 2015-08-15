var adminApp = angular.module('bsm.gui');
adminApp.controller('BookmarksController', [
	'$scope', 
	'RemoteProxy',
	'RemoteUrl', 
	function($scope, remoteProxyService, remoteUrlProvider){
		console.log("start into BookmarksController....");

		$scope.bookmarks = [];

		/* area for fetching bookmarks*/

		// get url for retrieving bookmarks
		$scope.getBookmarksUrl = remoteUrlProvider.getUrl("bookmarks.getBookmarks", false).url;
		// callback function which is used to assign the bookmarks resource to GUI
		var getBookmarksResponse = function(data){
			console.log(data);
			if(data.success){
				$scope.bookmarks = data.result;
			}
			console.log($scope.bookmarks);
		};
		// sent the request for fetching all the bookmarks
		var getBookmarks = function(url){
			//fetch from remote when startup.
		    remoteProxyService["get"]({
		    	"url": url, 
		    	//"response": getSourceResponse, 
		    	"success": getBookmarksResponse
		    });
		};

		/*
		 *	fetch all the bookmarks from Mongodb at the very beginning of page loading
		 */
		getBookmarks($scope.getBookmarksUrl);
		
	    console.log("getting out of the BookmarksController...");
	}
]);