/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "atm",
  name: "atm-paymentmethod",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: false,
    apiKey: ""
  },
  registry: [
    // Dashboard card
    {
      provides: "dashboard",
      label: "atm Payment Provider",
      description: "atm payment provider",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod"
    },

    // Settings panel
    {
      label: "atm Payment Settings", // this key (minus spaces) is used for translations
      route: "/dashboard/atm",
      provides: "settings",
      container: "dashboard",
      template: "atmSettings"
    },

    // Payment form for checkout
    {
      template: "atmPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
