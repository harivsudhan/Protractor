import {browser, By, by, element, protractor} from "protractor";
import {fail} from "assert";
import {BasePageObject} from "../support/BasePageObject";

export class HomePage extends BasePageObject{

    private readonly pageHeader = element(By.css('app-page-header .rfs2-margin-r-1'));
    private readonly collapsibleRekeningnummer = element(by.cssContainingText('.rfs2-collapsible__title', 'IBAN Rekeningnummer'));
    private readonly rekeningnummeField = element(by.xpath('//input[@name = "searchInput"]'));
    private readonly startDateTextField = element(by.xpath('//input[@name="bookingStartDate"]'));
    private readonly endDateTextField = element(by.xpath('//input[@name="bookingEndDate"]'));
    private readonly zoekenButton = element(by.css('button.rfs2-button.rfs2-button--primary1'));
    private readonly tableHeader = element.all(by.xpath('//table[@class ="rfs2-table"]//td'));

    async launchLoginUrl() {
        await browser.manage().window().maximize();
        await browser.navigate().to(browser.baseUrl);
    }

    async checkPageHeader(headerTitle: string) {
        await browser.wait(this.until.elementToBeClickable(this.pageHeader), 10000);
        await this.pageHeader.click();
        await browser.driver.wait(this.until.textToBePresentInElement(this.pageHeader, headerTitle));
    }

    async expandRekeningnummer() {
        await browser.wait(this.until.elementToBeClickable(this.collapsibleRekeningnummer));
        await this.collapsibleRekeningnummer.click();
    }

    async enterRekeningnummer(rekeningnummer: string) {
        await browser.wait(this.until.visibilityOf(this.rekeningnummeField));
        await this.rekeningnummeField.sendKeys(rekeningnummer);
    }

    async enterDates(startDate: string, endDate: string) {
        try {
            await this.waitForElementToBeClickable(this.startDateTextField);
            await this.startDateTextField.sendKeys(startDate);
            await browser.wait(this.until.visibilityOf(this.endDateTextField));
            await this.endDateTextField.sendKeys(endDate);
        } catch (error) {
            fail("\nUnable to enter the date field " + error.toString() + "\n");
        }
    }

    async clickZoeken() {
        await this.waitForElementToBeClickable(this.zoekenButton);
        await this.zoekenButton.click();
    }

    async validateResultTable(index: number): Promise<string> {
        return this.tableHeader.get(index).getText();
    }
}

export const homePage: HomePage = new HomePage();