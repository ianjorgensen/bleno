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
  console.log('hey!! somebody is trying to read the ip')
  console.log(arguments);

  var data = new Buffer(5);
  data.writeUInt16BE(32, 0);
  data.writeUInt16BE(45, 1);
  data.writeUInt16BE(63, 2);
  data.writeUInt16BE(201, 3);
  console.log('make data', data);
  callback(this.RESULT_SUCCESS, data);
  console.log('made the callback')
};

module.exports = ShowIp;
