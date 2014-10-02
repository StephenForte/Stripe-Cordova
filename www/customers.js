var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Customers(){
  var me = this;
  this.processRequest = function(args, cb){
      exec(cb,null, "Stripe", "process", args);
  };
}

Customers.prototype.create = function(arg, successCallback){
    this.processRequest(["POST","customers", arg], successCallback);
}

Customers.prototype.retrieve = function(id, successCallback){
    this.processRequest(["GET","customers/" + id, null], successCallback);
}

Customers.prototype.update = function(id, arg, successCallback){
    this.processRequest(["POST","customers/" + id, arg], successCallback);
}

Customers.prototype.list = function(arg, successCallback){
    if (typeof(arg) !== "function"){
      this.processRequest(["GET","customers", arg], successCallback);
    }
    else{
      this.processRequest(["GET","customers", null], successCallback);
    }
}

Customers.prototype.remove = function(id, successCallback){
    this.processRequest(["DELETE", "customers/" + id, null], successCallback);
}

Customers.prototype.createCard = function(cusId, arg, successCallback){
    this.processRequest(["POST", "customers/" + cusId + "/cards", arg], successCallback);
}

Customers.prototype.retrieveCard = function(cusId, cardId, successCallback){
    this.processRequest(["GET", "customers/" + cusId + "/cards/" + cardId, null], successCallback);
}

Customers.prototype.removeCard = function(cusId, cardId, successCallback){
    this.processRequest(["DELETE","customers/" + cusId + "/cards/" + cardId, null], successCallback);
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = new Customers();
}
