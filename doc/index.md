# com.telerik.stripe

Stirpe is a payment infrastructure for the internet. Stripe Cordova SDK is built around the well organized REST API. it exposes a global `window.stripe` object that defines various operation to initialze and transfer payments.

Although the object is in the global scope, it is not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(window.stripe);
    }


## Installation

You need a Stripe API key for using this plugin, which you can obtain from [Stripe](https://stripe.com/docs). Once you have your API key, you can install the plugin in the following way:

    cordova plugin add url —variable API_KEY="YOUR_API_KEY"

## Methods
