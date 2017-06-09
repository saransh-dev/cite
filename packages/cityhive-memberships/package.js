Package.describe({
  name: 'cityhive:memberships'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'nova:users',
    'std:accounts-ui',
  ]);

  api.addFiles([
    'lib/accounts/custom_fields.js',
    'lib/callbacks.js',
  ], ['client', 'server']);


});
