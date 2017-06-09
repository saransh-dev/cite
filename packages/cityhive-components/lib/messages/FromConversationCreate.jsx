import React, {Component} from 'react';

class FromConversationCreate extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    listOfUsers() {
        const users = this.props.users;
        let options = [];
        users.forEach(function (user) {
            options.push(
                <option key={user.username} value={user.username}>{user.username}</option>
            )
        });

        return options;
    }

    formSubmit(e) {
        e.preventDefault();

        let conversation = {
            recipient   : this.refs.recipient.value,
            title       : this.refs.title.value,
            messages    : {
                body     : this.refs.body.value
            }
        };

        Meteor.call('conversations.create', conversation);

    }

    render() {
        return (
            <div className="form-conversation-create">
                <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <select className="form-control" ref="recipient" required="required">
                            <option value="">Select recipient</option>
                            {this.listOfUsers()}
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="title" type="text" placeholder="Enter Title" required="required"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" ref="body" rows="5" required="required"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

FromConversationCreate.displayName = "FromConversationCreate";
module.exports = FromConversationCreate;
export default FromConversationCreate;