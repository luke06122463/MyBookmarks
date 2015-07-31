'use strict';
var adminService = angular.module("bsm.service");
adminService.factory(
	'LocationService', [
	'$location',
	function($location){
	var locationService ={
		locationObj: {
			targetLocation: '/'
		},
		getTargetLocation: function(){
			return this.locationObj.targetLocation;
		},
		setTargetLocation: function(location){
			this.locationObj.targetLocation = (location==''?this.locationObj.targetLocation:location);
		},
		getLocationHost: function(){
			return window.location.host;
		},
		getLocationHostName: function(){
			return window.location.hostname;
		},
		getLocationPort: function(){
			return window.location.port;
		},
		getLocationProtocol: function(){
			return window.location.protocol;
		},
		getLocationPathname: function(){
			return window.location.pathname;
		},
		getLocationHash: function(){
			return window.location.hash;
		},
		getSearchUrl: function(){
			return locationService.getLocationProtocol() + '//' + locationService.getLocationHost() + '/search';
		},
		getAdminUrl: function(){
			return locationService.getLocationProtocol() + '//' + locationService.getLocationHost() + '/admin';
		},
		path: function(url){
			$location.path(url);
		},
		pathToTargetLocation: function(url){
			$location.path(this.locationObj.targetLocation);
		}
	};
	return locationService; 
}]);