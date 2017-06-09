import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';
import Options from 'meteor/cityhive:admin-options';
import { IntlProvider, intlShape} from 'react-intl';
import NovaForm from "meteor/nova:forms";

class AdminOptionsCreate extends Component {
    
    render() {
        return (
            <div className="admin-options-create">
                <div className="breadcrumbs">
                    <span>Create Option</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">

                    <NovaForm
                        collection={Options}
                        methodName="options.create"
                        currentUser={this.props.currentUser}
                        successCallback={(option)=> {
                            this.context.messages.flash(this.context.intl.formatMessage({id: "admin.options.created_message"}, {title: option.title}), 'success')
                        }}
                    />
                </div>
            </div>
        )
    }
    
}

AdminOptionsCreate.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape
};

AdminOptionsCreate.displayName = "AdminOptionsCreate";

module.exports = AdminOptionsCreate;
export default AdminOptionsCreate;