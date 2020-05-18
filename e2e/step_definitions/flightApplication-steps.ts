import { browser, WebDriver, until, WebElement } from 'protractor';
import { LoginPages } from '../pages/flightApplication-page';
import { Logger } from '../support/logger';
import { ExcelUtility } from '../components/excel-utility';
import { ReusuableFunctions } from '../components/json-helper';
import { fail } from 'assert';


let stepDefinitionsWrapper = function () {
	let driver: WebDriver;

	this.Before(async function () {
		driver = browser.driver;
		await browser.waitForAngularEnabled(false);
	});

	this.Given(/^I execute "([^"]*)" functionality for TestCase "([^"]*)"$/, async (application: string, TestCaseID: string) => {
		LoginPages.applicationName = application;
		LoginPages.testcaseID = TestCaseID;
	});

	this.Given(/^user lands on the HomePage with "([^"]*)" and "([^"]*)"$/, async (userName: string, password: string) => {
		await browser.manage().window().maximize();
		await browser.get(browser.baseUrl, 10000);

		let WebElement: WebElement = await driver.wait(until.elementLocated(LoginPages.loginLink), 10000);
		await WebElement.click();

		WebElement = await driver.wait(until.elementIsVisible(driver.findElement(LoginPages.username)), 10000);
		let UserName: string = await ExcelUtility.getTestdata(LoginPages.testcaseID, userName, LoginPages.applicationName);
		await WebElement.clear();
		await WebElement.sendKeys(UserName);

		WebElement = await driver.wait(until.elementIsVisible(driver.findElement(LoginPages.passWord)), 10000);
		let Password: string = await ExcelUtility.getTestdata(LoginPages.testcaseID, password, LoginPages.applicationName);
		await WebElement.clear();
		await WebElement.sendKeys(Password);

		WebElement = await driver.wait(until.elementLocated(LoginPages.loginLink), 5000);
		await WebElement.click();

		Logger.getInstance().log('User landed on Home Page Successfully ');
		
	});

	this.Given(/^I Logout$/, async () => {
		let ElementVisible: WebElement = await driver.wait(until.elementLocated(LoginPages.loggedIn), 5000);
		if (ElementVisible.isDisplayed()) {
			let actions = driver.actions();
			await actions.mouseMove(driver.findElement(LoginPages.loggedIn)).perform();
			let WebElement = await driver.wait(until.elementLocated(LoginPages.SignOff), 5000);
			await WebElement.click();
		}

	});

	this.Given(/^I verify top level menu names in the site$/, async () => {
		let testdata: string = await ReusuableFunctions.getjson();
		console.log('Get data from Json: ' + testdata);
		ReusuableFunctions.updatejson('protractor');
		let newdata: string = await ReusuableFunctions.getjson();
		console.log('Get data from Json: ' + newdata);
	});

}

module.exports = stepDefinitionsWrapper;