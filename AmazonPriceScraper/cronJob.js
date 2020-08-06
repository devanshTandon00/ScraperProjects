const cron = require('node-cron');
let shell = require('shelljs');

const url = process.argv[2];
// minimum price for which user wants an alert
const minPrice = process.argv[3];

const emailID = process.argv[4];

// scheduled to run every second
cron.schedule("15 * * * * *", function() {
  console.log("running");
  if(shell.exec(`node AmazonTracker.js ${url} ${minPrice} ${emailID}`).code !== 0){
    console.log("Something went wrong");
  }
});
