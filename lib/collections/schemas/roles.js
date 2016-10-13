import { Random } from "meteor/random";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const setRoles = new SimpleSchema({
  _id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  rolesName: {
    type: String,
    label: "Full name"
  },
  permissions: {
    label: "permissions",
    type: [String],
    optional: true
  },
  shopId: {
    type: String,
    label: "shop id"
  }
  });

