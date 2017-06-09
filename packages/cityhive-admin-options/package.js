Package.describe({
  name: "cityhive:admin-options",
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    // Nova packages
    'nova:core@0.27.0-nova',
    'nova:users@0.27.1-nova',
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
