import {browser} from 'protractor';

var eachStepScreensArr = [];

module.exports = function () {

    this.Before(() => {
        //Reset Array with Step screenshots
        eachStepScreensArr = [];
    });

    this.After((scenario) => {
        return browser.driver.manage().window().getPosition().then(function () { //reset size after each scenario
            return browser.takeScreenshot().then(function () { //reset position after each scenario
                //Attach any step screenshots to the scenario metadata
                for (var key in eachStepScreensArr) {
                    scenario.attach(eachStepScreensArr[key], 'image/png');
                }
            });
        });
        return Promise.resolve();
    });

    this.StepResult((stepResult) => {
        var step = stepResult.getStep();

        if (step.getName() && stepResult.getStatus() !== 'skipped') {
            return browser.executeScript('return {' +
                'height: document.body.scrollHeight,' +
                'width: document.body.scrollWidth' +
                '}'
            ).then(function () {
                return browser.driver.manage().window().getSize().then(function () {
                    return browser.takeScreenshot().then(function (png) {
                        eachStepScreensArr.push(new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64'));
                    });
                });
            });
        }
        return Promise.resolve();
    });
};

