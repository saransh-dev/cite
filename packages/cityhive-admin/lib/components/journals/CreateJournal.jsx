import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Journals from 'meteor/cityhive:journals';
import {intlShape} from 'react-intl';
import { ModalTrigger, Messages, FlashContainer } from "meteor/nova:core";

class CreateJournal extends Component {

  render(props, context) {

    return (
      <div className="create-page">
        <Telescope.components.DashboardMenu/>.
        <NovaForm
          collection={Journals}
          methodName="journals.create"
          currentUser={this.props.currentUser}
          successCallback={(journal)=> {
            //console.log( Journals.getPageUrl(journal) );
          }}
        />
      </div>
    );

  }

}

CreateJournal.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default CreateJournal;
