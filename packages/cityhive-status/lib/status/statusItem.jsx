import React, {PropTypes, Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import { createContainer } from 'meteor/react-meteor-data'
import {Status, StatusComments/*, Like*/} from '../collection.js';
import statusCommentsItemList from './statusCommentsItemList.jsx';
import Telescope from 'meteor/nova:lib';


class StatusItem extends Component {
  constructor(props) {
    super(props);
    //const subscription = Meteor.subscribe('like', this.props.postId);
    this.state = {
      content: '',
      render: false,
    };
  }

  like() {
    Meteor.call('likeStatus.insert', {id: this.props.status._id, type: 'Status'},  () =>{
	    this.setState({
	      render: !this.state.render
	    })
    });
  }

  contentHandle(event) {
    this.setState({
      content: event.target.value.trim()
    })
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.content.length) {
    	data = {
	      statusId: this.props.status._id,
	      content: this.state.content,
    	}
    	Meteor.call('statusComments.insert', data, () =>{
		    this.setState({
		      content: ''
		    })
    	});

    }
  }

	commentsCount(){
		return StatusComments.find({'statusId':this.props.status._id}).count();
	}

  render(props, context) {

    const status = this.props.status;
    createdAt = moment(status.createdAt).format("DD MMM YYYY");

    //like = Like.find({parentType: 'Status', parentId: status._id}).count();
    //isMyLike = Like.find({parentType: 'Status', parentId: status._id, userId: Meteor.userId()}).count();
    return (
		<div className="statusItem" >
		{status.like}
			<div className="statusHead">
				<div className="statusText">
          <div className="status-last-update status-update-top"><strong>Current status </strong> - Last updated 
            <span className='status-last-update-date'> {createdAt}</span>
          </div>       
					{status.content}
					<div className="status-last-update status-update-bottom">Last updated: 
						<span className='status-last-update-date'> {createdAt}</span>
					</div>
				</div>
			</div>
		</div>
    );

  }

}

StatusItem.propTypes = {
  status: React.PropTypes.object.isRequired
};


StatusItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = StatusItem;
export default StatusItem;