import React, {PropTypes, Component} from 'react';
import Pages from 'meteor/cityhive:pages';
import {ListContainer} from "meteor/utilities:react-list-container";
import AdminUsersList from './AdminUsersList';

class AdminUsersEdit extends Component {

    constructor() {
        super();
        this.state = {
            firstName: 0,
            lastName: 0,
            email: 0,
            filterStatus: 'inactive',
            usersCount: 'Processing...'
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentWillMount() {
        this.usersCount();
    }

    filter() {

        let filter = {};

        if (this.state.firstName) {
            filter['profile.firstName'] = this.state.firstName;
        } else {
            if ('profile.firstName' in filter) {
                delete filter["profile.firstName"];
            }
        }

        if (this.state.lastName) {
            filter['profile.lastName'] = this.state.lastName;
        } else {
            if ('profile.lastName' in filter) {
                delete filter["profile.lastName"];
            }
        }

        if (this.state.email) {
            filter['emails.address'] = this.state.email;
        } else {
            if ('emails.address' in filter) {
                delete filter["emails.address"];
            }
        }

        filter['_id'] = {
            $ne : Meteor.userId()
        };

        return filter;
    }

    clearFilters() {
        this.setState({firstName: null});
        this.setState({lastName: null});
        this.setState({email: null});

        $('form.filters').trigger('reset');
        this.filter();
    }

    onSubmit(e) {
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let email = this.refs.email.value;

        firstName ? this.setState({firstName: {$regex: "^" + firstName + "$", $options: 'i'}}) : this.setState({firstName: null});
        lastName ? this.setState({lastName: {$regex: "^" + lastName + "$", $options: 'i'}}) : this.setState({lastName: null});
        email ? this.setState({email: {$regex: "^" + email + "$", $options: 'i'}}) : this.setState({email: null});

        this.filter();

        e.preventDefault();
    }

    usersCount() {
        let self = this;
        Meteor.call('cityhive.users.count', function (err, res) {
            if(!err) {
                self.setState({usersCount: res})
            }
        })
    }

    render() {

    return (
      <div className="admin-edit-users">
          <div className="breadcrumbs">
              <span>Edit Users</span>
          </div>
          <div className="user-directory section--grey section--padding clearfix">

              <div className="breadcrumbs">
                  <p>Filter by:</p>
                  <form className="filters form-inline" onSubmit={this.onSubmit}>
                      <input type="text" ref="firstName" className="form-control firstName" placeholder="First name"/>
                      <input type="text" ref="lastName" className="form-control lastName" placeholder="Last name"/>
                      <input type="email" ref="email" className="form-control lastName" placeholder="Email"/>
                      <input type="submit" className="btn" value="Apply Filters"/>
                      <button onClick={this.clearFilters} className="btn">Reset Filters</button>
                  </form>
                  <span className="users-count">Registered users: <span>{this.state.usersCount}</span></span>
              </div>

            <ListContainer
              collection={Meteor.users}
              publication="admin.users.edit.list"
              selector={this.filter()}
              terms={{options: {sort: {createdAt: -1}}}}
              options={{sort: {createdAt: -1}}}
              limit={15}
              component={AdminUsersList}
              listId="users.list"
            />
          </div>
      </div>
    );

  }

}

AdminUsersEdit.displayName = "AdminUsersEdit";

module.exports = AdminUsersEdit;
export default AdminUsersEdit;
