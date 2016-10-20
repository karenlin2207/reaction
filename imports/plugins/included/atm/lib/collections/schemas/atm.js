import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const atmPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.apiKey": {
      type: String,
      label: "API Key",
      optional: true
    }
  }
]);

export const atmPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "匯款帳戶名"
  },
  cardNumber: {
    type: String,
    min: 5,
    max: 5,
    label: "匯款帳號末五碼"
  }
});
