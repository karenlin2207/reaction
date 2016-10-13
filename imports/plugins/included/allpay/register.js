/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "allPay",
  name: "allPay",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: false,
    merchantID : "",
    hashKey: "",
    hashIV: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "all Pay",
      description: "all Pay",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod"
    },
    // Settings panel
    {
      label: "Payment Settings", // this key (minus spaces) is used for translations
      route: "/dashboard/allpay",
      provides: "settings",
      container: "dashboard",
      template: "allpaySettings"
    },
    // Payment form for checkout
    {
      template: "allpayPaymentForm",
      provides: "paymentMethod"
    },
    {
      label: "allpay receive",
      route: "receive"
    }
  ]
});
