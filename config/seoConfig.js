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
	as: as,
	mode: {
		seoYahoo: {
			title: 'Yahoo Seo enhance',
			num: '1',
			url: '/seoyahoo'
		},
		seoGoogle: {
			title: 'Google Seo enhance',
			num: '2',
			url: '/seogoogle'
		},
		asYahoo: {
			title: 'Yahoo assasin',
			num: '3',
			url: '/asyahoo'
		},
		asGoogle: {
			title: 'Google assasin',
			num: '4',
			url: '/asgoogle'
		}
	}
}
