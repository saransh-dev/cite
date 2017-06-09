import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";
import Pages from 'meteor/cityhive:pages';
import { intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import {Link} from 'react-router';

class MainMenuItem extends Component {

    render() {

        const page = this.props;

        return (
            <li><Link to={`/${page.slug}`} activeClassName='active'>{page.title}</Link></li>
        )
    }

}

export default MainMenuItem;
