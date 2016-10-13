import { setRoles } from "/lib/collections";

// This code only runs on the server
Meteor.publish('setRoles', function() {
return setRoles.find();
});
