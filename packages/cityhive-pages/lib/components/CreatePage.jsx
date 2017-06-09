import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Pages from '../collection';
import {intlShape} from 'react-intl';

class CreatePage extends Component {

  render(props, context) {

    return (
      <div className="create-page">
        <Telescope.components.DashboardMenu/>
        <NovaForm
          collection={Pages}
          methodName="pages.create"
          currentUser={this.props.currentUser}
          successCallback={(page)=> {
            this.context.messages.flash('New page created', "success");
          }}
        />
      </div>
    );

  }

}

CreatePage.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default CreatePage;