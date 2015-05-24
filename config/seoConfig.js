var path = require('path');
var scenarioConfig = path.join(__dirname, '../public/scenarioConfig/');
var seo = {
		yahoo: 'seoyahoo',
		google: 'seogoogle'
	};
var as = {
	yahoo: 'asyahoo',
	google: 'asgoogle'
};
module.exports =
{
	seo: seo,
	scConfig: {
		yahoo: scenarioConfig + seo.yahoo + ".json",
		google: scenarioConfig + seo.google + ".json",
		asYahoo: scenarioConfig + as.yahoo + ".json",
		asGoogle: scenarioConfig + as.google + ".json"
	},
	as: as
}
