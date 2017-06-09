import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import MainMenuItem from './MainMenuItem';
import { FormattedMessage } from 'react-intl';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

class MainMenuList extends Component {
    render() {
        return (
            <ul>
                {this.props.results.map(page => <MainMenuItem key={page._id} {...page} currentUser={this.props.currentUser}/>)}
            </ul>
        )
    }
}

export default MainMenuList;
