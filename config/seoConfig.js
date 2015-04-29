var path = require('path');
var scenarioConfig = path.join(__dirname, '../public/scenarioConfig/');
var seo = {
		yahoo: 'seoyahoo',
		google: 'seogoogle'
	};
module.exports =
{
	seo: seo,
	scConfig: {
		yahoo: scenarioConfig + seo.yahoo + ".json",
		google: scenarioConfig + seo.google + ".json"
	}
}
