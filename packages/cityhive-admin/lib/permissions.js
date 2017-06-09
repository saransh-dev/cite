import Users from 'meteor/nova:users';

const adminActions = [
  "admin.view",
];
Users.groups.admins.can(adminActions);
