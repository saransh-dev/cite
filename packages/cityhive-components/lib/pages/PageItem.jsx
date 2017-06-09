import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Helpers} from '../helpers';
import { Link } from 'react-router';

class PageItem extends Component {

  render() {

    const page = this.props.page;

    let pageClass = "page-item";
    if (page.sticky) pageClass += " page-sticky";

    return (
      <div className={pageClass}>

        <h3 className="page-item-title">
            {page.title}
        </h3>

        <div className="page-item-content">
          <p dangerouslySetInnerHTML={{__html: page.content}}/>
        </div>

      </div>
    )
  }
}

PageItem.propTypes = {
  page: React.PropTypes.object.isRequired
};

PageItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = PageItem;
export default PageItem;