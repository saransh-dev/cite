import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Status } from '../collection.js';
import NovaForm from "meteor/nova:forms";
import Users from 'meteor/nova:users'

class StatusCommentsField extends Component {


  constructor(props) {
    super(props);
    //const subscription = Meteor.subscribe('like', this.props.postId);
    this.state = {
      content: '',
    };
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

  render(props, context) {

    return (
      <div className="addComment">
        <textarea onKeyPress={this._handleKeyPress.bind(this)} value={this.state.content} onChange={this.contentHandle.bind(this)} placeholder='Write comment' className='form-control'></textarea>
        <p>Press «Enter», to comment.</p>
      </div>
    );

  }

}

module.exports = StatusCommentsField;
export default StatusCommentsField;