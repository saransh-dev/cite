import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Helpers} from '../helpers';
import { Link } from 'react-router';
import { FormattedMessage, FormattedRelative } from 'react-intl';

class JournalsListItem extends Component {

  render() {

    const journal = this.props.journal;

    let journalClass = "journals-list-item";

    return (
      <div className={journalClass}>

        <div className="journals-list-item-title">
          <Link to={Helpers.getPageUrl(journal)} className="journals-list-item-title-link">
            {journal.title}
          </Link>
        </div>

        <div className="journals-list-item-meta">
          <div className="journals-list-item-date">
              <div className="posts-item-date">
                  Written on {journal.createdAt ? moment(journal.createdAt).format('Do MMMM YYYY') :
                      <FormattedMessage id="posts.dateNotDefined"/>}
              </div>
          </div>
        </div>

      </div>
    )
  }
}

JournalsListItem.propTypes = {
  journal: React.PropTypes.object.isRequired
};

JournalsListItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = JournalsListItem;
export default JournalsListItem;