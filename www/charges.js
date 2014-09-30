var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Charges(){
  var me = this;

  this.processRequest = function(args, cb){
      exec(cb,null, "Stripe", "process", args);
  };
}

Charges.prototype.create = function(arg, successCallback){
    this.processRequest(["POST","charges", arg], successCallback);
}

Charges.prototype.retrieve = function(id, successCallback){
    this.processRequest(["GET","charges/" + id, null], successCallback);
}

Charges.prototype.update = function(id, arg, successCallback){
    this.processRequest(["POST","charges/" + id, arg], successCallback);
}

Charges.prototype.list = function(successCallback){
  this.processRequest(["GET","charges", null], successCallback);
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new Charges();
}
