
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import {browserHistory} from 'react-router';

require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class CreatePageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // content: '',
            model: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.cloudName = "dl25y9xfd"; // from https://cloudinary.com/console
        this.apiKey = "173649537729756"; // from https://cloudinary.com/console
        this.unsignedPreset = "jbjwtlsv"; // created at https://cloudinary.com/console/settings/upload
        this.fullPath = "//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload";

    }

    handleModelChange(model) {
      console.log(this.cloudName);
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

    formSubmit(e) {
        e.preventDefault();
        let pageDocument = {
            title: this.refs.pageTitle.value,
            slug: this.refs.pageSlug.value,
            menuInclude: this.refs.pageMenuInclude.value,
            menuWeight: this.refs.pageMenuWeight.value,
            content: this.state.model
        };

        Meteor.call('pages.create', pageDocument, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Page Created', 'success');
                    browserHistory.push('/admin/pages');
                }
            }
        });

    }

    render(props, context) {
        // <FroalaEditor tag='textbox'/>, document.getElementById('edit')
        return (

            <div className="create-page-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="page-title">Page Title</label>
                        <input ref="pageTitle" id="page-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-slug">Page Slug</label>
                        <input ref="pageSlug" id="page-slug" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-include">Include in Main Menu</label>
                        <select ref="pageMenuInclude" id="menu-include" required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-weight">Menu Weight</label>
                        <input ref="pageMenuWeight" id="menu-weight" className="form-control" type="text" required />
                    </div>

                    <div className="form-group editor--status">
                        <label htmlFor="page-content">Content</label>
                        <FroalaEditor
                            model={this.state.model}
                            onModelChange={this.handleModelChange}
                            config= {{
                              placeholderText: 'Enter Your Content Here!',
                              charCounterCount: false,
                              height: '250px',
                              className: 'edit',
                              toolbarBottom: true,
                              imageUploadURL: '//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload',
                              imageUploadParams: {
                                  upload_preset: this.unsignedPreset,
                                  api_key: this.apiKey
                              }
                            }}
                        />
                        <FroalaEditorView
                          model={this.state.model}
                        />
                    </div>
                    <input type="submit" value="Create Page"/>
                </form>

            </div>
        );

    }

}


CreatePageForm.displayName = "CreatePageForm";

export default CreatePageForm;
