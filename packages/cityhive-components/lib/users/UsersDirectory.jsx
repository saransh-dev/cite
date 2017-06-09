import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import Users from "meteor/nova:users";

class UsersDirectory extends Component {

    setFilterStatus(status) {
        this.setState({
            filterStatus: status
        })
    }    

    constructor() {
        super();
        this.state = {
            firstName: 0,
            lastName: 0,
            profession: 0,
            department: 0,
            firm: 0,
            filterStatus: 'inactive',
            usersCount: 'Processing...'
        };
        /*
        this.firstNameHandleChange = this.firstNameHandleChange.bind(this);
        this.lastNameHandleChange = this.lastNameHandleChange.bind(this);
        this.occupationHandleChange = this.occupationHandleChange.bind(this);
        this.departmentHandleChange = this.departmentHandleChange.bind(this);
        this.firmHandleChange = this.firmHandleChange.bind(this);
        */
        this.onSubmit = this.onSubmit.bind(this);
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

        if (this.state.profession) {
            filter['profile.profession'] = this.state.profession;
        } else {
            if ('profile.profession' in filter) {
                delete filter["profile.profession"];
            }
        }

        if (this.state.department) {
            filter['profile.department'] = this.state.department;
        } else {
            if ('profile.department' in filter) {
                delete filter["profile.department"];
            }
        }

        if (this.state.firm) {
            filter['profile.firm'] = this.state.firm;
        } else {
            if ('profile.firm' in filter) {
                delete filter["profile.firm"];
            }
        }

        if(_.isEmpty(filter) && this.state.filterStatus == 'active') {
            filter['profile.firstName'] = '';
            filter['profile.lastName'] = '';
            filter['profile.profession'] = '';
            filter['profile.department'] = '';
            filter['profile.firm'] = '';
        }

        filter['_id'] = {
            $ne : Meteor.userId()
        };

        return filter;
    }

    /*
    firstNameHandleChange(event) {
        if(event.target.value) {
            this.setState({firstName: {$regex: event.target.value, $options: 'i'}});
        } else {
            this.setState({firstName: event.target.value});
        }
        this.filter();
    }

    lastNameHandleChange(event) {
        if(event.target.value) {
            this.setState({lastName: {$regex: event.target.value, $options: 'i'}});
        } else {
            this.setState({lastName: event.target.value});
        }
        this.filter();
    }

    occupationHandleChange(event) {
        if(event.target.value) {
            this.setState({occupation: {$regex: event.target.value, $options: 'i'}});
        } else {
            this.setState({occupation: event.target.value});
        }
        this.filter();
    }

    departmentHandleChange(event) {
        if(event.target.value) {
            this.setState({department: {$regex: event.target.value, $options: 'i'}});
        } else {
            this.setState({department: event.target.value});
        }
        this.filter();
    }

    firmHandleChange(event) {
        if(event.target.value) {
            this.setState({firm: {$regex: event.target.value, $options: 'i'}});
        } else {
            this.setState({firm: event.target.value});
        }
        this.filter();
    }
    */

    clearFilters() {
        this.setState({firstName: null});
        this.setState({lastName: null});
        this.setState({profession: null});
        this.setState({department: null});
        this.setState({firm: null});

        $('.users-directory-filters form').trigger('reset');
        this.filter();
    }

    onSubmit(e) {
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let profession = this.refs.profession.value;
        let department = this.refs.department.value;
        let firm = this.refs.firm.value;

        firstName ? this.setState({firstName: {$regex: "^" + firstName + "$", $options: 'i'}}) : this.setState({firstName: null});
        lastName ? this.setState({lastName: {$regex: "^" + lastName + "$", $options: 'i'}}) : this.setState({lastName: null});
        profession ? this.setState({profession: {$regex: "^" + profession + "$", $options: 'i'}}) : this.setState({profession: null});
        department ? this.setState({department: {$regex: "^" + department + "$", $options: 'i'}}) : this.setState({department: null});
        firm ? this.setState({firm: {$regex: "^" + firm + "$", $options: 'i'}}) : this.setState({firm: null});

        this.setState({filterStatus: 'active'});

        this.filter();

        e.preventDefault();
    }

    getFilterToggleClassName() {
        let classes = 'users-directory-filters ';

        if(this.state.filterStatus == 'inactive') classes =  classes + 'inactive';
        if(this.state.filterStatus == 'initiated') classes = classes + 'initiated';
        if(this.state.filterStatus == 'active') classes = classes + 'active';

        return classes;
    }

    removeRegex(str) {
        str = str.$regex.replace('^', '');
        str = str.replace('$', '')
        return str;
    }

    renderFilterStatusText() {
        if(this.state.filterStatus == 'inactive') return <p>Showing all {this.state.usersCount} members</p>;
        if(this.state.filterStatus == 'initiated') return <p>Find people you may know</p>;
        if(this.state.filterStatus == 'active') {
            let num = 0;
            let firstName = this.state.firstName ? this.removeRegex(this.state.firstName) : '';
            let lastName = this.state.lastName ? this.removeRegex(this.state.lastName) : '';
            let profession = this.state.profession ? this.removeRegex(this.state.profession) : '';
            let department = this.state.department ? this.removeRegex(this.state.department) : '';
            let firm = this.state.firm ? this.removeRegex(this.state.firm) : '';

            return (
                <div className="summary">
                    <p>Showing users by:</p>
                    {firstName && <p>First Name: <span>{firstName}</span></p>}
                    {lastName && <p>Last Name: <span>{lastName}</span></p>}
                    {profession && <p>Profession: <span>{profession}</span></p>}
                    {department && <p>Department: <span>{department}</span></p>}
                    {firm && <p>Firm: <span>{firm}</span></p>}
                </div>
            )
        }

    }

    renderFilterToggleButton() {

        if(this.state.filterStatus == 'inactive') {
            return (
                <span className="toggle-filters" onClick={() => this.setFilterStatus('initiated')}>
                    Filter users <span className="icon"><i className="iconmoon-cityhive-iconmoon-font-v2-ol_filters"></i></span>
                </span>
            );
        }

        if(this.state.filterStatus == 'initiated') {
            return (
                <span className="toggle-filters" onClick={() => this.setFilterStatus('inactive')}>
                    Cancel <span className="icon"><i className="iconmoon-cityhive-iconmoon-font-v2-ol_arrow-up"></i></span>
                </span>
            );
        }

        if(this.state.filterStatus == 'active') {
            return (
                <span className="toggle-filters" onClick={() => {this.clearFilters(); this.setFilterStatus('initiated')}}>
                    Clear Filters <span className="icon"><i className="iconmoon-cityhive-iconmoon-font-v2-ol_close"></i></span>
                </span>
            );
        }

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
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
            <div>
                <div className="breadcrumbs">
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages-copy"></i> <span>User directory</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">

                    <div className={this.getFilterToggleClassName()}>

                        <div className="filter-top clearfix">
                            <div className="filter-status">
                                {this.renderFilterStatusText()}
                            </div>
                            {this.renderFilterToggleButton()}
                        </div>

                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-sm-4 form-check">
                                    <label htmlFor="firstName">Name</label>
                                    <input type="text" ref="firstName" className="form-control firstName" placeholder="First name"/>
                                </div>
                                <div className="col-sm-4 form-check">
                                    <label htmlFor="lastName">Surname</label>
                                    <input type="text" ref="lastName" className="form-control lastName" placeholder="Last name"/>
                                </div>
                                <div className="col-sm-4 form-check">
                                    <label htmlFor="profession">Profession</label>
                                    <select ref="profession" id="profession">
                                        <option value="">Profession</option>
                                        <option value="asset-management">Asset Management</option>
                                        <option value="investment-management">Investment Management</option>
                                        <option value="private-banking">Private Banking</option>
                                        <option value="wealth-management">Wealth Management</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="col-sm-4 form-check">
                                    <label htmlFor="department">Department</label>
                                    <select ref="department" id="department">
                                        <option value="">Department</option>
                                        <option value="finance">Finance</option>
                                        <option value="human-resources">Human Resources</option>
                                        <option value="management">Management</option>
                                        <option value="legal">Legal</option>
                                        <option value="marketing-product-strategy">Marketing & Product Strategy</option>
                                        <option value="operations-it">Operations & IT</option>
                                        <option value="risk-compliance">Risk & Compliance</option>
                                        <option value="sales-distribution">Sales & Distribution</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="col-sm-4 form-check">
                                    <label htmlFor="firm">Firm</label>
                                    <input type="text" ref="firm" className="form-control firm" placeholder="Firm"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <input type="submit" value="Apply Filters"/>
                                </div>
                            </div>
                        </form>

                    </div>

                    <ListContainer
                        collection={Users}
                        publication="cityhive.users.directory"
                        selector={this.filter()}
                        terms={{hideBlocked: true}}
                        component={Telescope.components.UsersDirectoryList}
                        limit={8}
                        increment={8}
                        listId='users.directory.list'
                    />

                </div>
                </div>
            </Telescope.components.Profile>

        );
    }

}

UsersDirectory.displayName = "UsersDirectory";
module.exports = UsersDirectory;
export default UsersDirectory;