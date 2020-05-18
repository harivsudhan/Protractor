// cmd.params.js 
// parse cmd parameters

var params = {};

process.argv.slice(3).forEach(function (arg) {
    let flag = arg.split('=')[0];
    let value = arg.split('=')[1];
    let name = flag.replace('--', '');

    params[name] = value;
    if (params[name] === 'ie') {
        params[name] = 'internet explorer';
        console.log('The browser is ' + params[name]);
    } 
});

module.exports = params;
