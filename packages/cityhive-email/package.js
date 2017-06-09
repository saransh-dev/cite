Package.describe({
  name: 'cityhive:email'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core',
    'nova:email@0.27.2-nova'
  ]);

  api.addFiles([
    'lib/emails.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/methods.js',
    'lib/server/templates.js'
  ], ['server']);

  api.addAssets([
    'lib/server/emails/common/wrapper.handlebars',
    'lib/server/emails/accounts/generic.handlebars',
    'lib/server/emails/accounts/deleteAccount.handlebars',
    'lib/server/emails/accounts/verifyAccount.handlebars',
    'lib/server/emails/accounts/resetPassword.handlebars',
  ], ['server']);

});
