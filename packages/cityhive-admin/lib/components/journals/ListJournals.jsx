import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import Journal from './Journal';

class ListJournals extends Component {

  render() {

    return (
      <div className="list-journals">
        {this.props.results.map(journal => <Journal key={journal._id} {...journal} currentUser={this.props.currentUser}/>)}
      </div>
    )
  }
}

const LoadMore = (props) => {
  return <div><a href="#" className="load-more button button--primary" onClick={props.loadMore}>Load More({props.count}/{props.totalCount})</a></div>
};

export default ListJournals;
