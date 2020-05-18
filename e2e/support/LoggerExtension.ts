import { browser } from 'protractor';
import { Logger } from './logger';

module.exports = function () {

    this.Before(async function (scenario) {

        const logger = Logger.getInstance();

        const featureName = scenario.getUri().replace(/.*features(\/|\\)/, '').replace(/\.[\s\S]+/, '');
        const fileName = `${featureName}-${scenario.getName()}`;

        logger.setOutputFile(fileName);
        logger.log('Browser session id: ' + await (await browser.getSession()).getId());

    });

    this.BeforeStep((step) => {

        if (step && step.getName()) {
            Logger.getInstance().log(step.getName());
        }

    });

}