var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Customers(){
  this.processRequest = function(args, cb, error){
      exec(cb,error, "Stripe", "process", args);
  };
}

Customers.prototype.create = function(arg, successCallback, errorCallback){
    this.processRequest(["POST","customers", arg], successCallback, errorCallback);
}

Customers.prototype.retrieve = function(id, successCallback, errorCallback){
    this.processRequest(["GET","customers/" + id, null], successCallback, errorCallback);
}

Customers.prototype.update = function(id, arg, successCallback, errorCallback){
    this.processRequest(["POST","customers/" + id, arg], successCallback, errorCallback);
}

Customers.prototype.list = function(arg, successCallback, errorCallback){
    if (typeof(arg) !== "function"){
      this.processRequest(["GET","customers", arg], successCallback, errorCallback);
    }
    else{
      this.processRequest(["GET","customers", null], successCallback, errorCallback);
    }
}

Customers.prototype.remove = function(id, successCallback, errorCallback){
    this.processRequest(["DELETE", "customers/" + id, null], successCallback, errorCallback);
}

Customers.prototype.createCard = function(cusId, arg, successCallback, errorCallback){
    this.processRequest(["POST", "customers/" + cusId + "/cards", arg], successCallback, errorCallback);
}

Customers.prototype.retrieveCard = function(cusId, cardId, successCallback, errorCallback){
    this.processRequest(["GET", "customers/" + cusId + "/cards/" + cardId, null], successCallback, errorCallback);
}

Customers.prototype.removeCard = function(cusId, cardId, successCallback, errorCallback){
    this.processRequest(["DELETE","customers/" + cusId + "/cards/" + cardId, null], successCallback, errorCallback);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = new Customers();
}
