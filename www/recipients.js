var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Recipients(){
  this.processRequest = function(args, cb, error){
      exec(cb,error, "Stripe", "process", args);
  };
}

Recipients.prototype.create = function(arg, successCallback, errorCallback){
    this.processRequest(["POST","recipients", arg], successCallback, errorCallback);
}

Recipients.prototype.retrieve = function(id, successCallback, errorCallback){
    this.processRequest(["GET","recipients/" + id, null], successCallback, errorCallback);
}

Recipients.prototype.update = function(id, arg, successCallback, errorCallback){
    this.processRequest(["POST","recipients/" + id, arg], successCallback, errorCallback);
}

Recipients.prototype.list = function(successCallback, errorCallback){
  this.processRequest(["GET","recipients", null], successCallback, errorCallback);
}

Recipients.prototype.remove = function(id, successCallback, errorCallback){
  this.processRequest(["DELETE", "recipients/" + id, null], successCallback, errorCallback);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = new Recipients();
}
