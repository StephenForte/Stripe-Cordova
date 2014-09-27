#import <Cordova/CDV.h>

#define  BASE_URL @"https://api.stripe.com/v1/"

@interface CDVStripe : CDVPlugin
  - (void)process:(CDVInvokedUrlCommand*)command;
@end
