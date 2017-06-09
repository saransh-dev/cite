import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Helpers} from '../helpers';
import { Link } from 'react-router';
import { FormattedMessage, FormattedRelative } from 'react-intl';

class JournalsItem extends Component {

  render() {

    const journal = this.props.journal;

    let journalClass = "journals-item";

    return (
      <div className={journalClass}>

      <Link className="back-button-top" to="/press" ><i className="iconmoon-cityhive-iconmoon-font-v2-ol_arrow-up-left"></i> Back</Link>

        <h3 className="journals-item-title">
          <Link to={Helpers.getPageUrl(journal)} className="journal-item-title-link">
            {journal.title}
          </Link>
        </h3>

        <div className="journals-item-meta">
          <div className="journals-item-date">
              <div className="posts-item-date">
                  Written on {journal.createdAt ? moment(journal.createdAt).format('Do MMMM YYYY') :
                      <FormattedMessage id="posts.dateNotDefined"/>}
              </div>
          </div>
        </div>

        <div className="journals-item-content">
            <p dangerouslySetInnerHTML={{__html: journal.content}}/>
        </div>

        <Link className="back-button-bottom" to="/press" ><i className="iconmoon-cityhive-iconmoon-font-v2-ol_arrow-up-left"></i> Back</Link>

      </div>
    )
  }
}

JournalsItem.propTypes = {
  journal: React.PropTypes.object.isRequired
};

JournalsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = JournalsItem;
export default JournalsItem;