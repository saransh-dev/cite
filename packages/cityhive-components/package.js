Package.describe({
  name: "cityhive:components"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    // Nova packages
    'nova:core@0.27.0-nova',
    'cityhive:pages',
    'cityhive:admin-options',
    'cityhive:accounts',
    'cityhive:status',
    // third-party packages
    'std:accounts-ui@1.2.6',
    'utilities:react-list-container@0.1.10',
    'patrickml:react-modal',
    'cityhive:chat',
    'socialize:likeable',
    'socialize:commentable',
    'cityhive:user-blocking',
    'cityhive:email',
    'reactive-dict'
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
