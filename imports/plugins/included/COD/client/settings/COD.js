import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { CODPackageConfig } from "../../lib/collections/schemas";

import "./COD.html";


Template.CODSettings.helpers({
  CODPackageConfig() {
    return CODPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "COD-paymentmethod",
      shopId: Reaction.getShopId()
    });
  }
});


Template.COD.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "COD-paymentmethod",
      shopId: Reaction.getShopId()
    });
  }
});

Template.COD.events({
  "click [data-event-action=showCODSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "COD-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("COD Payment Method settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("COD Payment Method settings update failed. " + error, "danger");
    }
  }
});
