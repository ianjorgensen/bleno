var util = require('util');
var bleno = require('../..');
var pizza = require('./pizza');

var toByteArray = function(dataString) {
  var data = new Uint8Array(dataString.length);
  for (var i = 0; i < data.length; i++) {
    data[i] = dataString.charCodeAt(i);
  }
  return data;
};

function ShowIp(pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330002',
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Get device ip address'
      })
    ]
  });

  this.pizza = pizza;
}

util.inherits(ShowIp, bleno.Characteristic);

ShowIp.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(2);
    data.writeUInt16BE(this.pizza.toppings, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = ShowIp;
