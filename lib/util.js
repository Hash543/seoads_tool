var _ = require("lodash");
var fs = require('fs');
module.exports = {
	splitKeyword: function(keywords){
		var k = keywords.split(",");
		return k[_.random(0,(k.length - 1))];
	},
	browser: function(){
		var browsers = ['firefox' , 'chrome'];
		return 'firebox';
		return 'chrome';
		//return browsers[_.random(0,1)];
	},
	randomUA: function(){
		var ua = fs.readFileSync(__dirname + '/../conf/ua.txt' , {encoding:'utf-8'});
		var uastr = ua.split("\n");
		return uastr[_.random(0,(uastr.length -1))].trim();
	}
}