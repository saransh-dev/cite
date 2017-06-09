import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
//import { ModalTrigger } from "meteor/nova:core";
import {Link} from 'react-router';
import { intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
//import EditPageForm from './forms/EditPageForm';
//import EditPageFormAboutUs from './forms/EditPageFormAboutUs';
//import EditPageFormMembership from './forms/EditPageFormMembership';
import {FlashContainer} from "meteor/nova:core";

class AdminPagesItem extends Component {

  constructor() {
    super();
    this.deletePage = this.deletePage.bind(this);
  }

  deletePage() {
    const page = this.props;
    const deletePageConfirm = "Delete " + page.title + " page?";

    if (window.confirm(deletePageConfirm)) {
      this.context.actions.call('pages.remove', page._id, (error, result) => {
        this.context.messages.flash("Page deleted", "success");
        this.context.events.track("page deleted", {'_id': page._id});
      });
    }
  }

  displayEditPageForm(pageDocument) {
    if(this.props.slug == 'about') {
      return <EditPageFormAboutUs document={pageDocument}  />;
    }
    if(this.props.slug == 'membership') {
      return <EditPageFormMembership document={pageDocument} />
    }
    return <EditPageForm document={pageDocument} />;
  }

  renderEdit() {

    const page = this.props;

    const component = (
      <ModalTrigger
        label="Edit Page"
        component={<p><FormattedMessage id="admin.pages.create.table.edit"/></p>}
      >
        <div>
          <div className="breadcrumbs">
            <span>Edit Page</span>
          </div>
          {this.displayEditPageForm(page)}
        </div>
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {this.props.currentUser && this.props.currentUser._id === page.userId ? component : ""}
      </div>
    )
  }

  render() {

    const page = this.props;

    return (
        <tr>
          <td>
            <p>{page._id}</p>
          </td>
          <td key={page.name}>
            <p>{page.title}</p>
          </td>
          <td className="edit">
            <Link to={`/admin/pages/edit/${page._id}`}>Edit Page</Link>
          </td>
          <td className="delete">
            <p onClick={this.deletePage}><FormattedMessage id="admin.pages.create.table.delete"/></p>
          </td>
        </tr>
    )
  }

}

AdminPagesItem.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default AdminPagesItem;

