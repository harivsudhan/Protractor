import {homePage} from "../pages";
import {expect} from "chai";

let stepDefinitionsWrapper = function () {

    this.Given(/^user navigates to the home page$/, async () => {
        await homePage.launchLoginUrl();
    });

    this.Then(/^user should see the BB8 page header "([^"]*)"$/, async (headerTitle: string) => {
            await homePage.checkPageHeader(headerTitle);
        }
    );

    this.Given(/^user expands the IBAN Rekeningnummer$/, async () => {
        await homePage.expandRekeningnummer();
    });

    this.When(/^the user enters the Rekeningnummer "([^"]*)"$/, async (rekeningnummer: string) => {
            await homePage.enterRekeningnummer(rekeningnummer);
        }
    );

    this.When(/^user enter Startdatum "([^"]*)" and Einddatum "([^"]*)"$/, async (startDate: string, endDate: string) => {
            await homePage.enterDates(startDate, endDate);
        }
    );

    this.When(/^user click the Zoeken button$/, async () => {
        await homePage.clickZoeken();
    });

    this.Then(/^user should verify the result table is displayed$/, async (table) => {
        let input: String = String(table.raw());
        let index: number = 0;

        for (const expected of input.split(',')) {
            console.log(expected);
            let actual = await homePage.validateResultTable(index);
            console.log(actual);
            expect(actual.trim()).equals(expected, 'The table header is wrongly displayed');
            index++;
        }
    });
}
module.exports = stepDefinitionsWrapper;
