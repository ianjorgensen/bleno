var util = require('util');
var bleno = require('../..');

var SetWifi = require('./setWifi');
var ShowIp = require('./showIp');

function PizzaService(pizza) {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new SetWifi(pizza),
            new ShowIp(pizza)
        ]
    });
}

util.inherits(PizzaService, bleno.PrimaryService);

module.exports = PizzaService;
