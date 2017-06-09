Package.describe({
  name: 'cityhive:accounts'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'nova:users',
    'std:accounts-ui',
    'xavcz:nova-forms-upload',
    'cityhive:user-blocking',
    'cityhive:cv-upload',
  ]);

  api.addFiles([
    'lib/permissions.js',
    'lib/subscriptions.js',
    'lib/custom_fields.js',
    'lib/methods.js',
    'lib/callbacks.js',
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/startup.js',
    'lib/server/publications.js',
    'lib/server/methods.js',
  ], ['server']);

});
