Package.describe({
  name: 'cityhive:admin'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'nova:users',
    'cityhive:articles'
  ]);

  api.addFiles([
    'lib/modules.js',
  ], ['client', 'server']);

});
