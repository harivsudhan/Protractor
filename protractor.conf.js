let framework = require.resolve('protractor-cucumber-framework');
const now = new Date();
let report_name = 'Report-' + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();

exports.config = {
	directConnect: true,
	chromeDriver: require(`chromedriver/lib/chromedriver`).path,
	allScriptsTimeout: 50000,
	framework: 'custom',
	frameworkPath: framework,
	maxinstances: 1,
	ignoreUncaughtExceptions: true,

	specs: [
		'e2e/features/*.feature'
	],

	SELENIUM_PROMISE_MANAGER: false,

	baseUrl: 'http://localhost:4200/',

	cucumberOpts: {
		compiler: "ts:ts-node/register",
		require: [
			'e2e/stepdefinitions/*.ts',
			'e2e/support/*.ts'
		],
		format: 'pretty',
		format: 'json:e2e/reports/results.json',
	},

	onComplete: function() {
		browser.quit();
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