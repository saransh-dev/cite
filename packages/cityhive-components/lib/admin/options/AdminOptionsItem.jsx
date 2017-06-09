import React, { PropTypes, Component } from 'react';
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";
import Options from 'meteor/cityhive:admin-options';
import { intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';

class AdminOptionsItem extends Component {

  constructor() {
    super();
    this.deleteOption = this.deleteOption.bind(this);
  }

  deleteOption() {
    const option = this.props;
    const deleteOptionConfirmation = "Delete " + option.title + " option?";

    if (window.confirm(deleteOptionConfirmation)) {
      this.context.actions.call('options.remove', option._id, (error, result) => {
        this.context.messages.flash("Option deleted", "success");
        this.context.events.track("option deleted", {'_id': option._id});
      });
    }
  }

  renderEdit() {

    const option = this.props;

    const component = (
      <ModalTrigger
        label="Edit Option"
        component={<p><FormattedMessage id="admin.options.edit"/></p>}
      >
        <div>
          <div className="breadcrumbs">
            <span>Edit Options</span>
          </div>
          <NovaForm
            collection={Options}
            currentUser={this.props.currentUser}
            document={option}
            methodName="options.edit"
          />
        </div>
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {component}
      </div>
    )
  }

  render() {

    const option = this.props;

    return (
        <tr>

          <td>
            <p>{option.optionName}</p>
          </td>

          <td>
            <p>{option.optionValue}</p>
          </td>

          <td className="edit">
            {this.renderEdit()}
          </td>

          <td className="delete">
            <p onClick={this.deleteOption}><FormattedMessage id="admin.options.delete"/></p>
          </td>

        </tr>
    )
  }

}

AdminOptionsItem.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default AdminOptionsItem;

