import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import { Link } from 'react-router';
import { Status } from 'meteor/cityhive:status';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import { Post } from 'meteor/socialize:feed';

class ProfileTimeline extends Component {

  constructor(props) {
    super(props);
  }

    image(user) {
        let imageSrc = user.profile.image ? user.profile.image : Telescope.settings.get('defaultProfileImage')
        return imageSrc;
    }

    getDate(date) {
    	//Today 4:30pm - 12.06.2016
        date = moment(new Date(date)).fromNow() + ' ' + moment(new Date(date)).format('h:mm a - DD.MM.YYYY')
        return date;
    }

    likePost(id, type) {
    	let post = null;
    	switch (type) {
		  case 'ChangeStatus':
    			post = Meteor.statuses.findOne({_id: id});
		    break
		  case 'Follow':
		    post = Meteor.follows.findOne({_id: id});
		    break
		}
    	if (!post) return;

    	if (!post.isLikedBy(Meteor.user())){
    		post.like();

			if(Meteor.userId() != post.userId) {
				Meteor.call('cityhive.email.newStatusLike', post.userId, type)
			}
    	}
    }

	statusCommentToggle(id) {
		$('.timeline-item .postComment textarea#' + id).parent().slideToggle();
		return false;
	}

    getLikeCount(id, type) {
    	let post = null;
    	switch (type) {
		  case 'ChangeStatus':
    			post = Meteor.statuses.findOne({_id: id});
		    break
		  case 'Follow':
		    post = Meteor.follows.findOne({_id: id});
		    break
		}
    	if (!post) return;
    	count = post.likeCount();
    	return count ? "("+count+")" : "";
    }

    isMyLike(id, type) {
    	let post = null;
    	switch (type) {
		  case 'ChangeStatus':
    			post = Meteor.statuses.findOne({_id: id});
		    break
		  case 'Follow':
		    post = Meteor.follows.findOne({_id: id});
		    break
		}
    	if (!post) return "Like";
    	let isliked = post.isLikedBy(Meteor.user());
    	return isliked ? "Liked" : "Like";
    }

    commentable(id, type, _id) {
    	let post = null;
    	switch (type) {
		  case 'ChangeStatus':
    			post = Meteor.statuses.findOne({_id: id});
		    break
		  case 'Follow':
		    	post = Meteor.follows.findOne({_id: id});
		    break
		}
    	if (!post) return;

    	let text = $('textarea#myprop'+_id).val();
    	let isliked = post.addComment(text);
    	$('textarea#myprop'+_id).val('');

		if(Meteor.userId() != post.userId) {
			Meteor.call('cityhive.email.newStatusComment', post.userId, type)
		}
    }

    getComments(id, type) {
    	let post = null;
    	switch (type) {
		  case 'ChangeStatus':
    			post = Meteor.statuses.findOne({_id: id});
		    break;
		  case 'Follow':
		    	post = Meteor.follows.findOne({_id: id});
		    break;
		}
    	if (!post) return;
    	return post.comments(null, null, "date", 1).map(comment => {
			let commentDate = moment(new Date(comment.date)).fromNow() + ' ' + moment(new Date(comment.date)).format('h:mm a - DD.MM.YYYY');
			return (
					<div key={comment._id}  className="commentItem">
					<span>{Meteor.users.findOne({_id: comment.userId}).profile.firstName + ' ' + Meteor.users.findOne({_id: comment.userId}).profile.lastName}</span>:
						{comment.body}
						<p className="comment-date"><small className="txt-col--grey-light">{commentDate}</small></p>
					</div>
				)
    	})

    }

	getCommentsCount(id, type) {
		let post = null;
		switch (type) {
			case 'ChangeStatus':
				post = Meteor.statuses.findOne({_id: id});
				break;
			case 'Follow':
				post = Meteor.follows.findOne({_id: id});
				break;
		}
		if (!post) return;
		return post.commentCount();

	}

	getLinkedUser(userId) {
		let user = Meteor.users.findOne({'_id': userId});
		if(user) {
			let link = '/user/profile/' + user._id;
			return <Link to={link}>{user.profile.firstName + ' ' +  user.profile.lastName}</Link>
		}
		return '';
	}

    posts() {
        if(Meteor.userId()) {
            let posts = this.props.posts;
            if(posts && posts.length) {
				return posts.map(p => {
					obj = JSON.parse(p.body);
					if(p.poster()) {
						return (
							<div key={p._id} className="timeline-item">
								<div className="timeline-item-icon">
									<img className="img-circle" src={this.image(p.poster())}/>
								</div>
								<div className="timeline-item-text-box">
									{
										obj.content ?//if
											<div className="timeline-item-text">
												<span className='timeline-item-text-name'>
													{p.posterId == Meteor.userId() ? 'You' : this.getLinkedUser(p.posterId) }
												</span>
												<br/>
												{obj.content}
											</div>
											: obj.followed ? //if
											<div className="timeline-item-text">
											<span className='timeline-item-text-name'>
												{p.posterId == Meteor.userId() ? 'You' : this.getLinkedUser(p.posterId) }
											</span>
												{obj.followed._id == Meteor.userId() ? ' started following you'
												: //else
												<span>
													&nbsp;started following&nbsp;
													<span className='timeline-item-text-name'>
													{ this.getLinkedUser( obj.followed._id )  }
													</span>
												</span>}

											</div>
										: //else
										<span></span>

									}
									<div className="timeline-item-date">
										<small className="txt-col--grey-light">{this.getDate(p.date)}</small>
									</div>
								</div>
								{
									obj.type != 'Follow' &&
										<div className="buttons">
											<a href="javascript:void(0)" onClick={this.statusCommentToggle.bind(this, 'myprop'+p._id)} className="btn btn-link btn-ghost-dark btn-rounded btn-rounded comment"><i className="iconmoon-cityhive-iconmoon-font-v2-ol_COMMENT" />Comment {this.getCommentsCount(obj.id, obj.type) ? <span>({this.getCommentsCount(obj.id, obj.type)})</span> : ''}</a>
											<a href="javascript:void(0)" onClick={this.likePost.bind(this, obj.id, obj.type)} className="btn btn-link btn-ghost-dark btn-rounded like">
												<i className="iconmoon-cityhive-iconmoon-font-v2-ol_LIKE"/>
												{this.isMyLike(obj.id, obj.type)} {this.getLikeCount(obj.id, obj.type)}
											</a>
										</div>
								}
								<div className="postComment">
									<div className='commentBox'>
										{this.getComments(obj.id, obj.type)}
									</div>
									<textarea id={'myprop'+p._id} placeholder="Write your comment"></textarea>
									<button onClick={this.commentable.bind(this, obj.id, obj.type, p._id)} className="btn btn-link btn-ghost-orange sendComment">Send</button>
								</div>
							</div>
						);
					}
				})
            }
        }

    }

    render() {
        return (
			<div className='profile-dashboard-box-right col-sm-7'>
				<div>
					<label className='profile-label'>Activity in your hive...</label>
					<div className='profile-timeline'>
						<ListContainer
							collection={Post.collection}
							publication="timelinePosts"
							options={{sort:  {"date" : -1}}}
							component={Telescope.components.PostsList}
							listId="posts.list"
							limit={10}
						/>
					</div>
				</div>
			</div>
		);
    }
}



ProfileTimeline.displayName = "ProfileTimeline";

module.exports = ProfileTimeline;

export default ProfileTimeline;
