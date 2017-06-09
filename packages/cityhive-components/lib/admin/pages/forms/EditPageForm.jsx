import React, {PropTypes, Component} from 'react';
// import TinyMCE from 'react-tinymce';
import ReactDOM from 'react-dom';
import {Messages} from 'meteor/nova:core';
import {browserHistory} from 'react-router';
import {FlashContainer} from "meteor/nova:core";

require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class EditPageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // content: props.document.content
            model: props.document.content
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.cloudName = "dl25y9xfd"; // from https://cloudinary.com/console
        this.apiKey = "173649537729756"; // from https://cloudinary.com/console
        this.unsignedPreset = "jbjwtlsv"; // created at https://cloudinary.com/console/settings/upload
        this.fullPath = "//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload";
    }

    // handleEditorChange(e) {
    //     this.setState({
    //         content: e.target.getContent()
    //     })
    // }
    handleModelChange(model) {
      console.log(this);
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
        let self = this;

        let pageDocument = this.props.document;

        let modifier = {
            $set : {
                title : this.refs.pageTitle.value,
                slug : this.refs.pageSlug.value,
                menuInclude : this.refs.pageMenuInclude.value,
                menuWeight : this.refs.pageMenuWeight.value,
                content : this.state.model
            }
        };

        Meteor.call('pages.edit', pageDocument._id, modifier, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Page Edited', 'success');
                    browserHistory.push('/admin/pages');
                }
            }
        });

    }

    render() {

        let title = this.props.document.title,
            slug = this.props.document.slug,
            menuInclude = this.props.document.menuInclude,
            menuWeight = this.props.document.menuWeight,
            content = this.state.model;

        return (
            <div className="create-page-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="page-title">Page Title</label>
                        <input defaultValue={title} ref="pageTitle" id="page-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-slug">Page Slug</label>
                        <input defaultValue={slug} ref="pageSlug" id="page-slug" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-include">Include in Main Menu</label>
                        <select defaultValue={menuInclude} ref="pageMenuInclude" id="menu-include" required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-weight">Menu Weight</label>
                        <input defaultValue={menuWeight} ref="pageMenuWeight" id="menu-weight" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
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

                    <input type="submit" className="btn btn-primary" value="Edit Page"/>
                </form>

            </div>
        );

    }

}

EditPageForm.displayName = "EditPageForm";

export default EditPageForm;
