var commander = require('commander');
var chalk = require('chalk');
var Pageres = require('pageres');

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
    console.log(chalk.green("Start testing the load-time of " + parameters.url));
}

loadTesting(parameters.url, parameters.iterations, parameters.viewport);
takeScreenshot(parameters.url, parameters.viewport);

function loadTesting(url, iterations, viewport) {
    for(var i = 1; i <= iterations; i++) {
        console.log("Do iteration " + i);
    }
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
