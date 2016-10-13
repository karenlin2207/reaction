import { Packages } from "/lib/collections";

export const allpay = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "allpay"
    }).settings;
    if (!settings.merchantID) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings.merchantID;
  }
};
