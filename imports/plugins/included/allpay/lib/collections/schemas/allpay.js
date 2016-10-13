import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const allpayPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.merchantID": {
      type: String,
      label: "Merchant ID"
    },
    "settings.hashKey": {
      type: String,
      label: "Hash Key"
    },
    "settings.hashIV": {
      type: String,
      label: "Hash IV"
    }
  }
]);

export const allpayPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name"
  },
  cardNumber: {
    type: String,
    min: 13,
    max: 16,
    label: "Card number"
  },
  expireMonth: {
    type: String,
    max: 2,
    label: "Expiration month"
  },
  expireYear: {
    type: String,
    max: 4,
    label: "Expiration year"
  },
  cvv: {
    type: String,
    max: 4,
    label: "CVV"
  }
});
