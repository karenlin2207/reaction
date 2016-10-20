/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops } from "/lib/collections";
import { atm } from "../../lib/api";
import { atmPayment } from "../../lib/collections/schemas";

import "./atm.html";

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

function handleatmSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


Template.atmPaymentForm.helpers({
  atmPayment() {
    return atmPayment;
  }
});

AutoForm.addHooks("atm-payment-form", {
  onSubmit: function (doc) {
    submitting = true;
    const template = this.template;
    hidePaymentAlert();
    const form = {
      name: doc.payerName,
      number: doc.cardNumber,
      type: "貨到付款"
    };
    const storedCard = form.type.charAt(0).toUpperCase() + form.type.slice(1) + " " + doc.cardNumber.slice(-4);

    atm.authorize(form, {
      total: Cart.findOne().cartTotal(),
      currency: Shops.findOne().currency
    }, function (error, transaction) {
      submitting = false;
      let paymentMethod;
      if (error) {
        handleatmSubmitError(error);
        uiEnd(template, "Resubmit payment");
      } else {
        if (transaction.saved === true) {
          paymentMethod = {
            processor: "atm",
            storedCard: storedCard,
            method: "atm Payment",
            transactionId: transaction.transactionId,
            currency: transaction.currency,
            amount: transaction.amount,
            paymentstatus:"unpaid",
            status: transaction.status,
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          paymentMethod.transactions.push(transaction.response);
          Meteor.call("cart/submitPayment", paymentMethod);
        } else {
          handleatmSubmitError(transaction.error);
          uiEnd(template, "Resubmit payment");
        }
      }
    });
    return false;
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
