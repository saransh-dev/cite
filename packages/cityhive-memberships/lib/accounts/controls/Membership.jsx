import React, { PropTypes, Component } from 'react';

class Membership extends Component {

    componentWillMount() {
        this.context.addToAutofilledValues({[this.props.name]: this.props.value || ''});
    }

    userMembershipStatus() {
        if(Meteor.user().cityhive.membership == 'free') return "Basic Membership";
        if(Meteor.user().cityhive.membership == 'corporate') return "Corporate Membership";
        if(Meteor.user().cityhive.membership == 'recruiter') return "Recruiter Membership";
    }

    render() {

        return (
            <div className="form-group row">
                <label className="col-form-label col-sm-3">{this.props.label}</label>
                <div className="col-sm-9">
                    <input
                        value={this.userMembershipStatus()}
                        name={this.props.name}
                        type="text"
                        disabled="disabled"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }
}

Membership.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,

};

Membership.contextTypes = {
    addToAutofilledValues: React.PropTypes.func
};

export default Membership;