package com.telerik.stripe;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.apache.http.HttpResponse;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.util.EntityUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.util.Base64;

public class StripePlugin extends CordovaPlugin {

  private String baseUrl =  "https://api.stripe.com/v1/";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("process")) {
          try {
        	  this.processCommand(callbackContext, args);
          } catch (UnsupportedEncodingException e) {
			callbackContext.error(e.getMessage());
          }
          return true;
        }
        return false;
    }

    private void processCommand(final CallbackContext callbackContext,final JSONArray args) throws JSONException, UnsupportedEncodingException {

         int appResId = cordova.getActivity().getResources().getIdentifier("api_key", "string", cordova.getActivity().getPackageName());
         String apiKey = cordova.getActivity().getString(appResId);

         final HttpClient httpclient = new DefaultHttpClient();

         final String method = args.getString(0);
         String action = args.getString(1);

         String url = this.baseUrl + action;

         final HttpRequestBase httpRequest;

         if (method.equals("POST")){
        	 httpRequest = new HttpPost(url);
         }
         else if (method.equals("DELETE")){
        	 httpRequest = new HttpDelete(url);
         }
         else{
        	 httpRequest = new HttpGet(url);
         }

         String base64EncodedCredentials = "Basic " + Base64.encodeToString(apiKey.getBytes(), Base64.NO_WRAP);

         httpRequest.setHeader("Authorization", base64EncodedCredentials);
         httpRequest.setHeader("Content-Type", "application/x-www-form-urlencoded");

         if (httpRequest instanceof HttpPost){
        	 try{
	        	 JSONObject jsonObject = args.getJSONObject(2);

	        	 if (jsonObject != null){
	        		 ((HttpPost)httpRequest).setEntity(this.buildBody(jsonObject));
	        	 }
        	 } catch(Exception e){
        		 e.printStackTrace();
        	 }
         }

         cordova.getThreadPool().execute(new Runnable() {
		 	@Override
		 	public void run() {
		 	        try {

		 	          HttpResponse res = httpclient.execute(httpRequest);
		 	          HttpEntity httpEntity = res.getEntity();
		 	          JSONObject response = new JSONObject(EntityUtils.toString(httpEntity));

		 	          callbackContext.success(response);

		 	        } catch (Exception e) {
		 	        	callbackContext.error(e.getMessage());
		 	        }
		 	}
		 });
    }

    private HttpEntity buildBody(JSONObject body) throws UnsupportedEncodingException, JSONException{
    	List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();

    	normalizeToNameValues("", nameValuePairs, body);

    	return new UrlEncodedFormEntity(nameValuePairs);
    }

    private void normalizeToNameValues(String root, List<NameValuePair> nameValuePairs, JSONObject jsonObject) throws JSONException{


     	@SuppressWarnings("unchecked")
 		Iterator<String> iterator = jsonObject.keys();

    	while(iterator.hasNext()){
    		String key = iterator.next();

    		try {
				if (jsonObject.get(key) instanceof JSONObject){
					normalizeToNameValues(key, nameValuePairs, jsonObject.getJSONObject(key));
				}
				else{
					if (!root.isEmpty()){
		    			nameValuePairs.add(new BasicNameValuePair(root + "[" + key + "]", jsonObject.getString(key)));
		    		}
		    		else{
		    			nameValuePairs.add(new BasicNameValuePair(key, jsonObject.getString(key)));
		    		}
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
    	}
    }
}
