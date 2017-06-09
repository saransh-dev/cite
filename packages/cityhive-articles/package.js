Package.describe({
  name: 'cityhive:articles'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'utilities:react-list-container@0.1.10',
    'utilities:smart-publications@0.1.4',
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
