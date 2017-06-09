import NovaEmail from 'meteor/nova:email';

NovaEmail.addEmails({

  generic: {
    template: "generic",
    path: "/email/generic",
    getProperties() {
      return {title: 'Title', content: 'Content'};
    },
    subject() {
      return "Subject";
    },
    getTestObject() {
      return {date: new Date()};
    }
  },
  deleteAccount: {
    template: "deleteAccount",
    path: "/email/delete-account",
    getProperties() {
      return {title: 'Title', content: 'Content', url: 'Url'};
    },
    subject() {
      return "Subject";
    },
    getTestObject() {
      return {date: new Date()};
    }
  },
  verifyAccount: {
    template: "verifyAccount",
    path: "/email/verify-account",
    getProperties() {
      return {title: 'Title', content: 'Content', url: 'Url'};
    },
    subject() {
      return "Subject";
    },
    getTestObject() {
      return {date: new Date()};
    }
  },
  resetPassword: {
    template: "resetPassword",
    path: "/email/reset-password",
    getProperties() {
      return {title: 'Title', content: 'Content', url: 'Url'};
    },
    subject() {
      return "Subject";
    },
    getTestObject() {
      return {date: new Date()};
    }
  }

});
