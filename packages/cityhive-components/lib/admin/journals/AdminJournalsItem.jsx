import React, { PropTypes, Component } from 'react';
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";
import Journals from 'meteor/cityhive:journals';
import { intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import EditJournalForm from './forms/EditJournalForm';
import {FlashContainer} from "meteor/nova:core";

class AdminJournalsItem extends Component {

  constructor() {
    super();
    this.deleteJournal = this.deleteJournal.bind(this);
  }

  deleteJournal() {
    const journal = this.props;
    const deleteJournalConfirmation = "Delete " + journal.title + " journal?";

    if (window.confirm(deleteJournalConfirmation)) {
      this.context.actions.call('journals.remove', journal._id, (error, result) => {
        this.context.messages.flash("Journal deleted", "success");
        this.context.events.track("journal deleted", {'_id': journal._id});
      });
    }
  }

  renderEdit() {

    const journal = this.props;

    const component = (
      <ModalTrigger
        label="Edit Journal"
        component={<p><FormattedMessage id="admin.journals.create.table.edit"/></p>}
      >
        <div>
          <div className="breadcrumbs">
            <span>Edit Journal</span>
          </div>
          <EditJournalForm document={journal} />
        </div>
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {this.props.currentUser && this.props.currentUser._id === journal.userId ? component : ""}
      </div>
    )
  }

  render() {

    const journal = this.props;

    return (
        <tr>
          <td key={journal.name}>
            <p>{journal.title}</p>
          </td>
          <td className="edit">
            {this.renderEdit()}
          </td>
          <td className="delete">
            <p onClick={this.deleteJournal}><FormattedMessage id="admin.journals.create.table.delete"/></p>
          </td>
        </tr>
    )
  }

}

AdminJournalsItem.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default AdminJournalsItem;

