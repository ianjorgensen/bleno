var util = require('util');
var bleno = require('../..');
var pizza = require('./pizza');
var WiFiControl = require('wifi-control');
var exec = require('child_process').exec;

//  Initialize wifi-control package with verbose output
WiFiControl.init({
  debug: true,
  iface: 'wlan0'
});

function bin2String(array) {
  var result = "";
  for (var i in array) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

function SetWifi(pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330001', // 13333333-3333-3333-3333-333333330001
    properties: ['write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Set wifi ssid and password'
      })
    ]
  });

  this.pizza = pizza;
}

util.inherits(SetWifi, bleno.Characteristic);

SetWifi.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  var creds = bin2String(data);
  console.log('got wifi info', data);
  console.log('string of data:', creds);
  var ss = { ssid: creds.split(',')[0], password: creds.split(',')[1] };

  console.log(ss);

  var ifaceState = WiFiControl.getIfaceState();
  console.log('ifaceState',ifaceState);

  //if (!ifaceState.ssid || ifaceState.ssid != ss.ssid) {
    console.log('attempt to connect');

    exec('nmcli d disconnect wlan0', function(error, stdout, stderr) {
      console.error('exec error',error);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      WiFiControl.connectToAP(ss , function(err, response) {
        if (err) console.log('err', err);
        console.log('response', response);
      });

      exec('nmcli d wifi con "' + ss.ssid +  '" password "' + ss.password + '"', function(error, stdout, stderr) {
        console.error('connect wifi exec error',error);
        console.log('connect wifi stdout:', stdout);
        console.log('connect wifi stderr:', stderr);

        /*WiFiControl.connectToAP(ss , function(err, response) {
          if (err) console.log('err', err);
          console.log('response', response);
        });*/
      });
    });
  //}

  callback(this.RESULT_SUCCESS);
};

module.exports = SetWifi;
