var util = require('util');
var bleno = require('../..');
var pizza = require('./pizza');
var WiFiControl = require('wifi-control');

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
  var creds = bin2String(data).split('\u000e')[0];
  console.log('got wifi info', data);
  console.log('string of data:', creds);
  var ss = { ssid: creds.split(',')[0], password: creds.split(',')[1] };

  console.log(ss);

  WiFiControl.resetWiFi( function(err, response) {
   if (err) console.log(err);
   console.log(response);

   WiFiControl.connectToAP(ss , function(err, response) {
     if (err) console.log('err', err);
     console.log('response', response);
   });
 } );

  callback(this.RESULT_SUCCESS);
};

module.exports = SetWifi;
