var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Transfers(){
  var me = this;

  this.processRequest = function(args, cb){
      exec(cb, null, "Stripe", "process", args);
  };
}

Transfers.prototype.create = function(arg, successCallback){
    this.processRequest(["POST","transfers", arg], successCallback);
}

Transfers.prototype.retrieve = function(id, successCallback){
    this.processRequest(["GET","transfers/" + id, null], successCallback);
}

Transfers.prototype.update = function(id, arg, successCallback){
    this.processRequest(["POST","transfers/" + id, arg], successCallback);
}

Transfers.prototype.list = function(arg, successCallback){
    if (arg){
      this.processRequest(["GET","transfers?limit=" + arg.limit, null], successCallback);
    }
    else{
      this.processRequest(["GET","transfers", null], successCallback);
    }
}

Transfers.prototype.cancel = function(id, successCallback){
  this.processRequest(["POST", "transfers/"+ id + "/cancel", null], successCallback);
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new Transfers();
}
