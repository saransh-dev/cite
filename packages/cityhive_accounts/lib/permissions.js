import Users from 'meteor/nova:users';

const defaultActions= [
  'account.view',
  'profile.view'
];
Users.groups.default.can(defaultActions);
