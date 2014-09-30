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

### Customers

- stripe.customers.create
- stripe.customers.retrieve
- stripe.customers.list
- stripe.customers.remove
- stripe.customers.createCard
- stripe.customers.retrieveCard
- stripe.customers.removeCard

### Charges

- stripe.charges.create
- stripe.charges.list
- stripe.charges.retrieve
- stripe.charges.update
- stripe.charges.refund


### Transfers

- stripe.transfers.create
- stripe.transfers.list
- stripe.transfers.retrieve
- stripe.transfers.update
- stripe.transfers.cancel


### Recipients

- stripe.recipients.create
- stripe.recipients.list
- stripe.recipients.retrieve
- stripe.recipients.update
- stripe.recipients.remove


## Supported Platforms

- iOS
- Android


## Resources

For more information, please refer to the [Stripe Documentation](https://stripe.com/docs/api) for most up-to-date information on API parameters
