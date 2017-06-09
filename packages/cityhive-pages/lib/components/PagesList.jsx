import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import {Button} from 'react-bootstrap';
import {ModalTrigger} from "meteor/nova:core";
import Pages from '../collection';
import Page from './Page';
import {Accounts, STATES} from 'meteor/std:accounts-ui';

class PagesList extends Component {

  render() {

    return (
      <div className="pages">
        {this.props.results.map(page => <Page key={page._id} {...page} currentUser={this.props.currentUser}/>)}
      </div>
    )
  }
}

const LoadMore = (props) => {
  return <div><a href="#" className="load-more button button--primary" onClick={props.loadMore}>Load More({props.count}/{props.totalCount})</a></div>
};

export default PagesList;
