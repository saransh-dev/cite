Package.describe({
  name: 'cityhive:status'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:lib',
    'nova:users',
    'nova:forms',
    'socialize:likeable',
    'socialize:feed',
    'utilities:smart-publications@0.1.4',
    'socialize:follow',
    'socialize:base-model',
    'aldeed:simple-schema',
    'socialize:commentable',
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");
});