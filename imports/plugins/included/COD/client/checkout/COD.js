/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops } from "/lib/collections";
import { COD } from "../../lib/api";
import { CODPayment } from "../../lib/collections/schemas";

import "./COD.html";

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handleCODSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 5);
  }
}


Template.CODPaymentForm.helpers({
  CODPayment() {
    return CODPayment;
  }
});
Template.CODPaymentForm.events({
  'click #codbutton': function(event){
    event.preventDefault();
    var transactionId = Random.id();
    var amount = parseInt(Cart.findOne().cartTotal());
    var paymentMethod = {
            processor: "COD",
            method: "貨到付款",
            storedCard: "貨到付款",
            transactionId: transactionId,
            currency: "NTD",
            amount: amount,
            paymentstatus:"unpaid",
            status: "new",
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          response={
          amount: amount,
          transactionId: transactionId,
          currency: "NTD"
          };
          paymentMethod.transactions.push(response);
          Meteor.call("cart/submitPayment", paymentMethod);
  }
});

