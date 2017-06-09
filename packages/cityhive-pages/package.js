Package.describe({
  name: 'cityhive:pages'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  /*api.use([
    'nova:core@0.27.0-nova',
    'utilities:react-list-container@0.1.10',
    'utilities:smart-publications@0.1.4',
  ]);*/

  api.use([
    'nova:core',
    'std:accounts-ui@1.2.6',
    'utilities:react-list-container@0.1.10',
    'utilities:smart-publications@0.1.4',
    'cityhive:admin'
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
