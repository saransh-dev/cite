import '../config';

Slingshot.createDirective("UsersCV", Slingshot.S3Storage, {
  bucket: "cityhive",

  acl: "public-read",

  authorize: function (file, metaContext) {

    if (!this.userId) {
      throw new Meteor.Error("Login Required", 'Please login before posting files');
    }

    return true;
  },

  key: function (file) {
    var user = Meteor.users.findOne(this.userId);
    return 'cv' + user._id + "/" + Date.now() + '-' + file.name;
  }
});
