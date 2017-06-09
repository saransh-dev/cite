import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import Article from './Article';

class ListArticles extends Component {

  render() {

    return (
      <div className="list-articles">
        {this.props.results.map(article => <Article key={article._id} {...article} currentUser={this.props.currentUser}/>)}
      </div>
    )
  }
}

const LoadMore = (props) => {
  return <div><a href="#" className="load-more button button--primary" onClick={props.loadMore}>Load More({props.count}/{props.totalCount})</a></div>
};

export default ListArticles;
