import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { allpayPackageConfig } from "../../lib/collections/schemas";

import "./allpay.html";


Template.allpaySettings.helpers({
  allpayPackageConfig() {
    return allpayPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "allPay",
      shopId: Reaction.getShopId()
    });
  }
});


Template.allpay.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "allPay",
      shopId: Reaction.getShopId()
    });
  }
});

Template.allpay.events({
  "click [data-event-action=showallpaySettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "allpay-update-form": {
    onSuccess: function (operation, result, template) {
      Alerts.removeSeen();
      return Alerts.add("allpay Payment Method settings saved.", "success");
    },
    onError: function (operation, error, template) {
      Alerts.removeSeen();
      return Alerts.add("allpay Payment Method settings update failed. " + error, "danger");
    }
  }
});
