import Options from './collection';

const isAdmin = (user) => {
  //console.log('method, user:');
  //console.log(user);
  return user.isAdmin;
};

Options.smartMethods({
  createName: "options.create",
  editName: "options.edit",
  deleteName: 'options.remove',
  deleteCallback: isAdmin
});
