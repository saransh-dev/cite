import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Articles from 'meteor/cityhive:articles';
import {intlShape} from 'react-intl';
import { ModalTrigger, Messages, FlashContainer } from "meteor/nova:core";

class CreateArticle extends Component {

  render(props, context) {

    return (
      <div className="create-page">
        <Telescope.components.DashboardMenu/>
        <NovaForm
          collection={Articles}
          methodName="articles.create"
          currentUser={this.props.currentUser}
          successCallback={(article)=> {
            //console.log( Articles.getPageUrl(article) );
          }}
        />
      </div>
    );

  }

}

CreateArticle.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default CreateArticle;
