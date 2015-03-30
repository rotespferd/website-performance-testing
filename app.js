var commander = require('commander');
var chalk = require('chalk');
var Pageres = require('pageres');
var async = require('async');
var _ = require('underscore');
var exec = require('child_process').exec;

var loadtestCommand = './node_modules/.bin/phantomjs phantom-loadtest.js';

// TODO: add toggle for screenshot
commander
.version('0.1.0')
.option('-u, --url <url>', 'The URL to the website to test.')
.option('-i, --iterations <number>', 'The number of iterations.', null)
.option('-v, --viewport <string>', 'The viewport to test.', null, "1024x786")
.parse(process.argv);

// parse the commands
var parameters = {};

parameters.url = commander.url;
parameters.iterations = commander.iterations === null ? 1 : commander.iterations;
parameters.viewport = commander.viewport === null ? ["1024", "768"] : commander.viewport.split("x");

if(parameters.url === undefined) {
    console.log(chalk.red.bold("Please define an url to test with " + chalk.underline("-u")));
} else {
    console.log(chalk.green("Start testing the load-time of " + parameters.url + " with the viewport " + parameters.viewport));
}

loadTesting(parameters.url, parameters.iterations, parameters.viewport, function() {
    takeScreenshot(parameters.url, parameters.viewport);
});


// ---------------------------------------------------
// ----------------- helper --------------------------
// ---------------------------------------------------

function loadTesting(url, iterations, viewport, callbackFunc) {
    var functionArray = [];

    var runFunc = function(callbackAsync) {
        launchProcess(url, viewport, callbackAsync);
    };

    for(var i = 1; i <= iterations; i++) {
        functionArray.push(runFunc);
    }

    async.series(
        functionArray,
        function(err, results) {
            var sum = _.reduce(results, function(memo, num) { console.log(num + "ms"); return memo + parseInt(num); }, 0);
            console.log("It took " + sum + "ms");
            console.log("The average is " + (sum/results.length) + "ms");
            callbackFunc();
        }
    );


}

function launchProcess(url, viewport, callback) {
    var child;
    var viewportString = viewport[0] + ' ' + viewport[1];

    child = exec(loadtestCommand + ' ' + url + ' ' + viewportString,
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {

        }
        callback(null, stdout.replace("\n", ""));
    });
}

function takeScreenshot(url, viewport) {
    var viewportString = viewport[0] + "x" + viewport[1];

    var pageres = new Pageres()
    .src(url, [viewportString])
    .dest(__dirname + "/screenshots");

    pageres.run(function (err) {
        if (err) {
            throw err;
        }

        console.log('Toke screenshot!');
    });
}
