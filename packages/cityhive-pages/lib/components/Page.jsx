import React, { PropTypes, Component } from 'react';
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";
import Pages from '../collection';
import { FormattedMessage, intlShape } from 'react-intl';

class Page extends Component {

  constructor() {
    super();
    this.deletePage = this.deletePage.bind(this);
  }

  deletePage() {
    const page = this.props;
    const deletePageConfirm = "Delete " + page.title + " page?";

    if (window.confirm(deletePageConfirm)) {
      this.context.actions.call('pages.remove', page._id, (error, result) => {
        //console.log(error)
        //console.log(result)
        this.context.messages.flash("Page deleted", "success");
        this.context.events.track("page deleted", {'_id': page._id});
      });
    }
  }

  renderEdit() {

    const page = this.props;

    const component = (
      <ModalTrigger
        label="Edit Page"
        component={<Button bsStyle="primary">Edit Page</Button>}
      >
        <div>
          <h2>Edit Page</h2>
          <hr/>
          <br/>
          <NovaForm
            collection={Pages}
            currentUser={this.props.currentUser}
            document={page}
            methodName="pages.edit"
          />
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
      <div key={page.name} style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
        <h2>{page.title}</h2>
        <p>{page.review} – by <strong>{page.user && page.user.username}</strong></p>
        {this.renderEdit()}
        <Button bsStyle="primary" onClick={this.deletePage}>Delete Page</Button>
      </div>
    )
  }

}

Page.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
}

export default Page;
