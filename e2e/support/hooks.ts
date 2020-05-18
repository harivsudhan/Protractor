import { browser } from 'protractor';

module.exports = function () {
    this.After(function (scenario, done) {
        if (scenario.isFailed() || scenario.isSuccessful()) {
            browser.takeScreenshot().then(function (stream) {
                let decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                scenario.attach(decodedImage, 'image/png');
            }).then(function () {
                done();
            });
        } else {
            done();
        }
    });    
}
