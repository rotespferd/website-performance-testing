var page = require('webpage').create(),
system = require('system');


// set parameters

var address = system.args[1];

console.log("Test the address " + address);

var time = Date.now();
page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        time = Date.now() - time;
        console.log(time);
    }
    phantom.exit();
});
