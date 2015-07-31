var url_map = {
	"login": {
		"checkAuthentication":{
			"product":{
				"url":"auth/check_authentication",
				"action":"post", 
				"header": { 'Content-Type': 'application/x-www-form-urlencoded' }
			}, 
			"faked":{"url":"/admin/sample/result.json", "action":"get"}
		},
		"userLogin":{
			"product":{
				"url":"auth/prologin",
				"action":"post", 
				"header": { 'Content-Type': 'application/x-www-form-urlencoded' }
			}, 
			"faked":{"url":"/admin/sample/result.json", "action":"get"}
		},
		"userLogout":{
			"product":{
				"url":"auth/logout",
				"action":"get"
			}, 
			"faked":{"url":"/admin/sample/result.json", "action":"get"}
		},
	},
};
