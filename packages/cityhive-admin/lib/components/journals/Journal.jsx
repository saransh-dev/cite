import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import {Button} from 'react-bootstrap';
import {ModalTrigger} from "meteor/nova:core";
import Users from 'meteor/nova:users';
import Journals from 'meteor/cityhive:journals';
import { FormattedMessage, intlShape } from 'react-intl';

class Journal extends Component {

  constructor() {
    super();
    this.deleteJournal = this.deleteJournal.bind(this);
  }

  deleteJournal() {
    const journal = this.props;
    const deletePageConfirm = "Delete " + journal.title + " journal?";

    if (window.confirm(deletePageConfirm)) {
      this.context.actions.call('journals.remove', journal._id, (error, result) => {
        this.context.messages.flash("Journal deleted", "success");
        this.context.events.track("Journal deleted", {'_id': journal._id});
      });
    }
  }

  renderEdit() {

    const journal = this.props;

    const component = (
      <ModalTrigger
        label="Edit Journal"
        component={<Button bsStyle="primary">Edit Journal</Button>}
      >
        <NovaForm
          collection={Journals}
          currentUser={this.props.currentUser}
          document={journal}
          methodName="journals.edit"
        />
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {this.props.currentUser && this.props.currentUser._id === journal.userId || Users.isAdmin() ? component : ""}
      </div>
    )
  }

  render() {

    const journal = this.props;

    return (
      <div key={journal.name} style={{paddingBottom: "15px", marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
        <h2>{journal.title}</h2>
        <p>{journal.review} – by <strong>{journal.user && journal.user.username}</strong></p>
        {this.renderEdit()}
        <Button bsStyle="primary" onClick={this.deleteJournal}>Delete Journal</Button>
      </div>
    )
  }

}

Journal.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default Journal;
