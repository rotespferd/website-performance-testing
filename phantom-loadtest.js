var page = require('webpage').create(),
system = require('system');


// set parameters

var address = system.args[1];
var viewportWidth = system.args[2];
var viewportHeight = system.args[3];

// set the viewport
page.viewportSize = {
    width: viewportWidth,
    height: viewportHeight,
};

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
