var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Transfers(){
  this.processRequest = function(args, cb, error){
      exec(cb,error, "Stripe", "process", args);
  };
}

Transfers.prototype.create = function(arg, successCallback, errorCallback){
    this.processRequest(["POST","transfers", arg], successCallback, errorCallback);
}

Transfers.prototype.retrieve = function(id, successCallback, errorCallback){
    this.processRequest(["GET","transfers/" + id, null], successCallback, errorCallback);
}

Transfers.prototype.update = function(id, arg, successCallback, errorCallback){
    this.processRequest(["POST","transfers/" + id, arg], successCallback, errorCallback);
}

Transfers.prototype.list = function(arg, successCallback, errorCallback){
    if (arg){
      this.processRequest(["GET","transfers?limit=" + arg.limit, null], successCallback, errorCallback);
    }
    else{
      this.processRequest(["GET","transfers", null], successCallback, errorCallback);
    }
}

Transfers.prototype.cancel = function(id, successCallback, errorCallback){
  this.processRequest(["POST", "transfers/"+ id + "/cancel", null], successCallback, errorCallback);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = new Transfers();
}
