/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { HTTP } from 'meteor/http';
// reaction modules
import { Reaction, Logger } from "/server/api";
import { Packages } from "/lib/collections";

Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} transactionType authorize or capture
   * @param  {Object} cardData card Details
   * @param  {Object} paymentData The details of the Payment Needed
   * @return {Object} results normalized
   */
  "checkoutMac": function (cartData) {
      var allpaycheckout;
      var data = Packages.findOne({ 
        name: "allPay",
        shopId: Reaction.getShopId()
      });
      check(cartData, {
      MerchantTradeNo : String,
      MerchantTradeDate: String,
      TotalAmount: Number,
      TradeDesc: String,
      Items:  [Object],
      ReturnURL: String,
      ChoosePayment: String
      });
      var Allpay = require("allpay");
      var allpay = new Allpay({
        merchantID: data.settings.merchantID || "2000132",
        hashKey: data.settings.hashKey || "5294y06JbISpM5x9",
        hashIV: data.settings.hashIV || "v77hoKGq4kWxNNIS",
        mode: "test",
        debug: true
      });

      allpay.setHost({
        baseUrl: "payment.allpay.com.tw",
        port: 80,
        useSSL: false
      });

      allpay.aioCheckOut(cartData, function(err, result) {
          allpaycheckout = result;
      });
    return allpaycheckout;
  }
});
