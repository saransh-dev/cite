Package.describe({
  name: 'cityhive:tweets'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'mrt:twit'
  ]);

  api.addFiles([
    'lib/server.js',
  ], ['server']);

});
