/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "COD",
  name: "cod-paymentmethod",
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
      label: "COD Payment Provider",
      description: "COD payment provider",
      icon: "fa fa-credit-card-alt",
      priority: 3,
      container: "paymentMethod"
    },

    // Settings panel
    {
      label: "COD Payment Settings", // this key (minus spaces) is used for translations
      route: "/dashboard/COD",
      provides: "settings",
      container: "dashboard",
      template: "CODSettings"
    },

    // Payment form for checkout
    {
      template: "CODPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
