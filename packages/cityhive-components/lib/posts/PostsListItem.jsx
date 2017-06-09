import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import { Link } from 'react-router';
import { Status } from 'meteor/cityhive:status';
import ProfileTimelineComposer from '../profile/ProfileTimelineComposer';

import ReactDOM from 'react-dom';
require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class PostsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // content: '',
      model: '',
      visible: '1'
    };
    this.handleModelChange = this.handleModelChange.bind(this);
    this.cloudName = "dl25y9xfd"; // from https://cloudinary.com/console
    this.apiKey = "173649537729756"; // from https://cloudinary.com/console
    this.unsignedPreset = "jbjwtlsv"; // created at https://cloudinary.com/console/settings/upload
    this.fullPath = "//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload";
  }

  handleModelChange(model) {
    this.setState({model: model});
    if( this.cloudName === "yourcloud" || this.apiKey === "yourapikey" || this.unsignedPreset === "yourpreset") {
        console.log( "You need to put real values in the variables to make this work!");
    }

    // patching `parseJSON` because Froala doesn't allow customization of response
    const _parseJSON = jQuery.parseJSON;
    jQuery.parseJSON = function(j) {
        var response = _parseJSON(j);
        // TODO proper selection of url / secure_url based on the document link
        response.link = response.url; // Froala expects `link`
        return response;
    };
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
    else if (post.isLikedBy(Meteor.user())) {
      post.unlike();
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
    // Clear WYSIWYG after submit
    this.state.model = '';
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
            {<div dangerouslySetInnerHTML={{__html: comment.body}}></div>}
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
          let p = this.props.post;
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
                            {/*obj.content*/}
                            {<div className="" dangerouslySetInnerHTML={{__html: obj.content }}></div>}
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
                      { this.getComments(obj.id, obj.type) }
                    </div>
                    <textarea value={this.state.model} className="hidden-xs-up" id={'myprop'+p._id} placeholder="Write your comment"></textarea>
                    <FroalaEditor
                        model={this.state.model}
                        onModelChange={this.handleModelChange}
                        config= {{
                          key: 'zpB-8aoC-21qoF-11A2C-9rB2jk==',
                          pluginsEnabled: ['image', 'link', 'emoticons'],
                          placeholderText: 'Write your comment',
                          charCounterCount: false,
                          height: '150px',
                          toolbarInline: false,
                          toolbarBottom: true,
                          toolbarButtons: ['insertImage', 'emoticons', 'insertLink'],
                          quickInsertButtons: false,
                          linkAlwaysBlank: true,
                          linkEditButtons: ['linkEdit', 'linkRemove'],
                          imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
                          imageUploadURL: '//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload',
                          imageUploadParams: {
                              upload_preset: this.unsignedPreset,
                              api_key: this.apiKey
                          }
                        }}
                    />
                    <br/>
                    <button onClick={this.commentable.bind(this, obj.id, obj.type, p._id)} className="btn btn-link btn-ghost-orange sendComment">Send</button>
                  </div>
                </div>
            );
          }
    }


  render() {

    const post = this.props.post;

    return (
        <div>
          {this.posts()}
        </div>
    )
  }
}

PostsListItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

PostsListItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = ProfileTimelineComposer(PostsListItem);
export default ProfileTimelineComposer(PostsListItem);
