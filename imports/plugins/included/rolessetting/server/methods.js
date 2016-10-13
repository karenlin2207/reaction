import { setRoles } from "/lib/collections";
import { Reaction } from "/server/api";
import { Logger } from "/server/api";

Meteor.methods({
  "addRoles": function (doc) {
    console.log("[addRoles][doc]", doc);
    check(doc, {
	rolesName: String,
	//permissions: [String],
	shopId: String
    });

    console.log(Reaction.getShopId());
    if (!Reaction.hasPermission("shipping")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    var result = setRoles.find();
    console.log(setRoles.find().fetch());
    setRoles.insert({
        rolesName: doc.rolesName,
        shopId: doc.shopId
    });
    return true;
  },
  "searchRoles": function(){
    console.log("[searchRoles]");
    console.log(setRoles.find({
        shopId: Reaction.getShopId()
      }).fetch());
    var result = setRoles.find({
        shopId: Reaction.getShopId()
      });
    console.log("[result]", result.fetch());
    return result;
  },
  "addRolePermissions": function (roleId, permissions, group) {
    if (!Reaction.hasPermission("reaction-accounts", Meteor.userId(), group)) {
      throw new Meteor.Error(403, "Access denied");
    }
    check(roleId, Match.OneOf(String, Array));
    check(permissions, Match.OneOf(String, Array));
    check(group, Match.Optional(String));
    this.unblock();
    try {
      return setRoles.update({_id:roleId},{
        $addToSet:{
            permissions: { 
                $each:
                    permissions
            }
        } 
      });
    } catch (error) {
      return Logger.info(error);
    }
  },
  "removeRolePermissions": function(roleId, permissions, group){
    if (!Reaction.hasPermission("reaction-accounts", Meteor.userId(), group)) {
      throw new Meteor.Error(403, "Access denied");
    }
    check(roleId, Match.OneOf(String, Array));
    check(permissions, Match.OneOf(String, Array));
    check(group, Match.Optional(String));
    this.unblock();
    try {
      return setRoles.update({_id:roleId},{
        $pull:{
            permissions: { 
                $in:
                    permissions
            }
        } 
      });
    } catch (error) {
      return Logger.info(error);
    }
  }
});
