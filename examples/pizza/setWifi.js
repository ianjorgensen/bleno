var util = require('util');
var bleno = require('../..');
var pizza = require('./pizza');

function bin2String(array) {
  var result = "";
  for (var i in array) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

function SetWifi(pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330001',
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
  console.log('got wifi info',data);
  console.log('string of data:', bin2String(data))
  callback(this.RESULT_SUCCESS);
};

module.exports = SetWifi;
