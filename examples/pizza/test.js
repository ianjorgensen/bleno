var exec = require('child_process').exec;

exec('nmcli d disconnect wlan0', function(error, stdout, stderr) {
  if (error) {
    console.error('exec error',error);
    return;
  }
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});
