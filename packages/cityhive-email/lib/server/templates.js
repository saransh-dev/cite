import NovaEmail from 'meteor/nova:email';

NovaEmail.templates.wrapper = Assets.getText("lib/server/emails/common/wrapper.handlebars");

NovaEmail.addTemplates({
  generic:  Assets.getText("lib/server/emails/accounts/generic.handlebars"),
  deleteAccount:  Assets.getText("lib/server/emails/accounts/deleteAccount.handlebars"),
  verifyAccount:  Assets.getText("lib/server/emails/accounts/verifyAccount.handlebars"),
  resetPassword:  Assets.getText("lib/server/emails/accounts/resetPassword.handlebars"),
});
