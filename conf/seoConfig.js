!function () {
  	'use strict';
  	var path = require('path');
	var scenarioConfig = __dirname + '/../public/scenarioConfig/';
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
			seoyahoo: scenarioConfig + seo.yahoo + ".json",
			seogoogle: scenarioConfig + seo.google + ".json",
			asyahoo: scenarioConfig + as.yahoo + ".json",
			asgoogle: scenarioConfig + as.google + ".json"
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
}();