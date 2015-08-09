var adminApp = angular.module('bsm.gui');
adminApp.controller('BookmarksController', [
	'$scope', 
	'RemoteProxy',
	'RemoteUrl', 
	function($scope, remoteProxyService, remoteUrlProvider){
		console.log("start into BookmarksController....");

		$scope.bookmarks = [];

		$scope.getBookmarksUrl = remoteUrlProvider.getUrl("bookmarks.getBookmarks", false).url;

		var getBookmarksResponse = function(data){
			console.log(data);
			if(data.success){
				$scope.bookmarks = data.result;
			}
			console.log($scope.bookmarks);
		};


		var getBookmarks = function(url){
			//fetch from remote when startup.
		    remoteProxyService["get"]({
		    	"url": url, 
		    	//"response": getSourceResponse, 
		    	"success": getBookmarksResponse
		    });
		};

		getBookmarks($scope.getBookmarksUrl);
		
	    console.log("getting out of the BookmarksController...");
	}
]);