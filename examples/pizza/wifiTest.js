var WiFiControl = require('wifi-control');

//  Initialize wifi-control package with verbose output
WiFiControl.init({
  debug: true,
  iface: 'wlan0'
});

//  Try scanning for access points:
WiFiControl.scanForWiFi( function(err, response) {
  if (err) console.log(err);
  console.log(response);
});


var _ap = {
  ssid: "internet",
  password: "getonline"
};

var results = WiFiControl.connectToAP( _ap, function(err, response) {
  if (err) console.log(err);
  console.log(response);
});
