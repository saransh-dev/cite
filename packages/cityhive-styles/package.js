Package.describe({
  name: "cityhive:base-styles",
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'nova:core@0.27.1-nova',
    'fourseven:scss@3.9.0',
  ]);

  api.addFiles([
    'lib/stylesheets/bootstrap.css',
    'lib/stylesheets/main.scss'
  ], ['client']);

});
