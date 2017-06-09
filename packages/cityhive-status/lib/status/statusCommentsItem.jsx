import React, {PropTypes, Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import {statusComments/*, Like*/} from '../collection.js';


class statusCommentsItem extends Component {



  constructor(props) {
    super(props);
    //const subscription = Meteor.subscribe('like', this.props.postId);
    this.state = {
      ready: subscription.ready(),
      subscription: subscription,
      render: false,
    };
  }

  like() {
    Meteor.call('likeStatus.insert', {id: this.props.comment._id, type: 'Comment'},  () =>{
	    this.setState({
	      render: !this.state.render
	    })
    });
  }

  render(props, context) {
    const comment = this.props.comment;
    //like = Like.find({parentType: 'Comment', parentId: comment._id}).count();
    //isMyLike = Like.find({parentType: 'Comment', parentId: comment._id , userId: Meteor.userId()}).count();
    return (
			<div className="commentItem">
				<p className='text-muted userName'>{comment.username}</p>
				<div className="commentText">
					{comment.content}
				</div>
				<div className="commentEvents" >
					<a href="javascript:void(0)" onClick={this.like.bind(this)} title={isMyLike ? "Unlike this post." : 'Like this post.'}
            className="btn btn-link">Like <span className="badge">{like>0 ? like : ''}</span></a>
				</div>
			</div>
    );

  }

}

statusCommentsItem.propTypes = {
  comment: React.PropTypes.object.isRequired
};


statusCommentsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default statusCommentsItem;
