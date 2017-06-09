Package.describe({
  name: "cityhive:i18n-en-us",
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.27.0-nova'
  ]);

  api.addFiles([
    'lib/en_US.js'
  ], ["client", "server"]);
});
