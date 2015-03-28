var commander = require('commander');
var chalk = require('chalk');

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
