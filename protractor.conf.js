let framework = require.resolve('protractor-cucumber-framework');
let params = require('./params.js');
var now = new Date();
let report_name = 'Report-' + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
let browser = params.browser;

var multiCapabilities = browser.split(',').map(function (browserName) {
	if (browser === 'chrome') {
		return {
			browserName: browserName.trim(),
			platform: 'windows 10',
			chromeOptions: {
				args: ['--silent', '--disable-infobars', '--no-sandbox', '--test-type=browser', '--start-maximized'],
			}
		};
	} else if (browser === 'firefox') {
		console.log(' The browser is firefox');
		return {
			browserName: browserName.trim(),
			"acceptInsecureCerts": true,
		}
	} 
	else if (browser === 'internet explorer' || browser === 'ie') {
		console.log(' The browser is internet explorer');
		return {
			browserName: browserName.trim() === 'ie' ? 'internet explorer' : browserName,
		}
	}
});

exports.config = {    
	directConnect: false,
	seleniumAddress: 'http://localhost:4444/wd/hub',
	allScriptsTimeout: 500000,
	framework: 'custom',
	frameworkPath: framework,
	multiCapabilities: multiCapabilities,
	maxinstances: 1,
	ignoreUncaughtExceptions: true,

	specs: [
		'e2e/features/*.feature'
	],


	SELENIUM_PROMISE_MANAGER: false,

	suites: {
		smoke: [
			'e2e/features/flightApplication.feature',
		],
		regression: [
			'e2e/features/*.feature',
		]
	},

	baseUrl: 'https://www.trivago.in/',

	cucumberOpts: {
		compiler: "ts:ts-node/register",
		require: [
			'e2e/step_definitions/*.ts',
			'e2e/support/*.ts'
		],
		format: 'pretty',
		format: 'json:e2e/reports/results.json',
	},

	onComplete: function() {
	},
	plugins: [{
		package: 'protractor-multiple-cucumber-html-reporter-plugin',

		options: {
			openReportInBrowser: true,
			automaticallyGenerateReport: true,
			reportName: "Automation Execution Report",
			reportPath: 'e2e/reports/' + report_name + '/HTMLResults/',
			jsonOutputPath: 'e2e/reports/' + report_name,
			displayDuration: true,
			removeExistingJsonReportFile: true,
			removeOriginalJsonReportFile: true,
			pageFooter: "<div><p>Test Execution Results</p></div>"
		},
	}]
};