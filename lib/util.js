var _ = require("lodash");
module.exports = {
	splitKeyword: function(keywords){
		var k = keywords.split(",");
		return k[_.random(0,(k.length - 1))];
	},
	browser: function(){
		var browsers = ['firefox' , 'chrome'];
		return browsers[_.random(0,2)];
	}
}