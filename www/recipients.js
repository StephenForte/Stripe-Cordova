var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Recipients(){
  var me = this;

  this.processRequest = function(args, cb){
      exec(cb,null, "Stripe", "process", args);
  };
}

Recipients.prototype.create = function(arg, successCallback){
    this.processRequest(["POST","recipients", arg], successCallback);
}

Recipients.prototype.retrieve = function(id, successCallback){
    this.processRequest(["GET","recipients/" + id, null], successCallback);
}

Recipients.prototype.update = function(id, arg, successCallback){
    this.processRequest(["POST","recipients/" + id, arg], successCallback);
}

Recipients.prototype.list = function(successCallback){
  this.processRequest(["GET","recipients", null], successCallback);
}

Recipients.prototype.remove = function(id, successCallback){
  this.processRequest(["DELETE", "recipients/" + id, null], successCallback);
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new Recipients();
}
