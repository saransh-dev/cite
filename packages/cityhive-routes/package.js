Package.describe({
  name: 'cityhive:routes'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.27.0-nova'
  ]);

  api.addFiles([
    'lib/routes.jsx'
  ], ['client', 'server']);

});
