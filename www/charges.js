var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Charges(){
  this.processRequest = function(args, cb, error){
      exec(cb,error, "Stripe", "process", args);
  };
}

Charges.prototype.create = function(arg, successCallback, errorCallback){
    this.processRequest(["POST","charges", arg], successCallback, errorCallback);
}

Charges.prototype.retrieve = function(id, successCallback, errorCallback){
    this.processRequest(["GET","charges/" + id, null], successCallback, errorCallback);
}

Charges.prototype.update = function(id, arg, successCallback, errorCallback){
    this.processRequest(["POST","charges/" + id, arg], successCallback, errorCallback);
}

Charges.prototype.list = function(successCallback, errorCallback){
  this.processRequest(["GET","charges", null], successCallback, errorCallback);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = new Charges();
}
