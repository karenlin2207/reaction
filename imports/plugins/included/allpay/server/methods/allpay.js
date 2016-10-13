/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { HTTP } from 'meteor/http';
// reaction modules
import { Reaction, Logger } from "/server/api";



Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} transactionType authorize or capture
   * @param  {Object} cardData card Details
   * @param  {Object} paymentData The details of the Payment Needed
   * @return {Object} results normalized
   */
  "checkout": function (cartData) {
    check(cartData, {
      MerchantTradeNo : String,
      MerchantTradeDate: String,
      TotalAmount: Number,
      TradeDesc: String,
      Items:  [Object],
      ReturnURL: String,
      ChoosePayment: String
    });
    var result;
    try {
      allpay.aioCheckOut(cartData, function(err, result) {
        return result;
      });
    } catch (error) {
      Logger.warn(error);
      result = {
        saved: false,
        error: error
      };
    }
    return result;
  },

  /**
   * Capture a Charge
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "allpay/payment/capture": function (paymentData) {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    let authorizationId = paymentData.transactionId;
    let amount = paymentData.amount;
    let response = allpayApi.methods.capture.call({
      authorizationId: authorizationId,
      amount: amount
    });
    let result = {
      saved: true,
      response: response
    };
    return result;
  },

  /**
   * Create a refund
   * @param  {Object} paymentMethod object
   * @param  {Number} amount The amount to be refunded
   * @return {Object} result
   */
  "allpay/refund/create": function (paymentMethod, amount) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    check(amount, Number);
    let { transactionId } = paymentMethod;
    let response = allpayApi.methods.refund.call({
      transactionId: transactionId,
      amount: amount
    });
    let results = {
      saved: true,
      response: response
    };
    return results;
  },

  /**
   * List refunds
   * @param  {Object} paymentMethod Object containing the pertinant data
   * @return {Object} result
   */
  "allpay/refund/list": function (paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    const { transactionId } = paymentMethod;
    const response = allpayApi.methods.refunds.call({
      transactionId: transactionId
    });
    let result = [];
    for (let refund of response.refunds) {
      result.push(refund);
    }

    // The results retured from the GenericAPI just so happen to look like exactly what the dashboard
    // wants. The return package should ba an array of objects that look like this
    // {
    //   type: "refund",
    //   amount: Number,
    //   created: Number: Epoch Time,
    //   currency: String,
    //   raw: Object
    // }
    const emptyResult = [];
    return emptyResult;
  }
});
