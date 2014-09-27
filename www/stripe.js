var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Stripe(){
	var me = this;
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new Stripe();
}
