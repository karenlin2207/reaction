import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const CODPackageConfig = new SimpleSchema([
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

export const CODPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "匯款帳戶名"
  },
  cardNumber: {
    type: String,
    min: 13,
    max: 16,
    label: "匯款帳號末五碼"
  }
});
