import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { atmPackageConfig } from "../../lib/collections/schemas";

import "./atm.html";


Template.atmSettings.helpers({
  atmPackageConfig() {
    return atmPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "atm-paymentmethod",
      shopId: Reaction.getShopId()
    });
  }
});


Template.atm.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "atm-paymentmethod",
      shopId: Reaction.getShopId()
    });
  }
});

Template.atm.events({
  "click [data-event-action=showatmSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "atm-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("atm Payment Method settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("atm Payment Method settings update failed. " + error, "danger");
    }
  }
});
