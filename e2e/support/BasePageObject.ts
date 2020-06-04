import {browser, protractor} from "protractor";
import {fail} from "assert";

export class BasePageObject {
    protected until = protractor.ExpectedConditions;

    async waitForElementToBeClickable(element) {
        try {
            await browser.wait(this.until.elementToBeClickable(element), 5000);
        } catch (error) {
            fail("Unable to find the element " + element.locator() + "\n");
        }
    }
}
