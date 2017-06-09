import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Status } from '../collection.js';
import NovaForm from "meteor/nova:forms";
import Users from 'meteor/nova:users'

import ReactDOM from 'react-dom';
require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class StatusField extends Component {

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

  // contentHandle(event) {
  //   this.setState({
  //     content: event.target.value
  //   })
  // }

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

  changeSelect(event) {
    this.setState({
      visible: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.model.length) {
      data = {
        content: this.state.model,
        visible: this.state.visible,
      };

      Meteor.call('status.insert', data, (err, result) => {
        if(err){
          // ToDo: handle errors
        }
        this.state = {
          content: '',
          visible: '1',
        };         
      });
    }
    this.setState({model: ''});
  }

  render(props, context) {

    return (
      <div className="statusField margin-bot-l clearfix">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="textBox editor--status">
            {/*<textarea placeholder='Write your status' value={this.state.content} onChange={this.contentHandle.bind(this)} ></textarea>*/}
            <FroalaEditor
                model={this.state.model}
                onModelChange={this.handleModelChange}
                config= {{
                  key: 'zpB-8aoC-21qoF-11A2C-9rB2jk==',
                  pluginsEnabled: ['image', 'link', 'emoticons'],
                  placeholderText: 'Let the Hive know what\'s on your mind...',
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
          </div>

          <div className="buttonsBox row-fluid padding-top-sm">
          <label className="col-sm-3 no-padding txt-right"><small>Share with</small></label>
          <div className="col-sm-5">
              <div className="select-style">
                <select className='selectVisibility' onChange={this.changeSelect.bind(this)} value={this.state.visible}>
                  <option value='1'>All</option>
                  <option value='2'>Followers</option>
                  <option value='3'>Only Me</option>
                </select>
              </div>
            </div>

            <button className={(() => this.state.model.length > 0 ? 'btn col-sm-4 btn-orange' : 'btn col-sm-4 btn-orange disabled')()} type='submit'>Post</button>
          </div>
        </form>
      </div>
    );

  }

}

module.exports = StatusField;
export default StatusField;
