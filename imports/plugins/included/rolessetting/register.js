import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "RolesSetting",
  name: "reaction-rolessetting",
  icon: "fa fa-users",
  autoEnable: true,
  registry: [
    {
      provides: "dashboard",
      route: "/dashboard/rolessetting",
      name: "roles",
      label: "Roles",
      description: "Roles Setting",
      icon: "fa fa-users",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "roles",
      permissions: [{
        label: "reaction-rolessetting",
        permission: "reaction-rolessetting"
      }]
    },
    {
      label: "Roles Settings",
      provides: "settings",
      template: "rolesSettings",
      container: "reaction-rolessetting"
    }
  ]
});