import Telescope from 'meteor/nova:lib';

Telescope.callbacks.add("onCreateUser", setupUser);

function setupUser (user) {
  if(user.cityhive) {
    user.cityhive.membership = 'free';
  } else {
    user.cityhive = {
      membership : 'free'
    };
  }
  return user;
}
