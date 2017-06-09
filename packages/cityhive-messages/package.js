Package.describe({
  name: 'cityhive:messages'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'socialize:user-model',
    'socialize:messaging',
    'cityhive:chat'
  ]);

  api.mainModule("lib/client.js", "client");
  api.mainModule("lib/server.js", "server");

});
