import Telescope from 'meteor/nova:lib';


Telescope.registerComponent("Status", require('./status/status.jsx'));
Telescope.registerComponent("StatusItem", require('./status/statusItem.jsx'));
Telescope.registerComponent("StatusTextBox", require('./status/statusfield.jsx'));
Telescope.registerComponent("StatusCommentsComponent", require('./status/statusComments.jsx'));
Telescope.registerComponent("StatusCommentsField", require('./status/statusCommentsField.jsx'));