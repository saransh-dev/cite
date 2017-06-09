import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {browserHistory} from 'react-router';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";

class EditPageFormAboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: props.document.content,
            contentForCF1: props.document.customField && props.document.customField.field_1 ? props.document.customField.field_1 : '',
            contentForCF2: props.document.customField && props.document.customField.field_2 ? props.document.customField.field_2 : '',
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditorChangeForCF1 = this.handleEditorChangeForCF1.bind(this);
        this.handleEditorChangeForCF2 = this.handleEditorChangeForCF2.bind(this);
    }

    handleEditorChange(e) {
        this.setState({
            content: e.target.getContent()
        })
    }

    handleEditorChangeForCF1(e) {
        this.setState({
            contentForCF1: e.target.getContent()
        })
    }

    handleEditorChangeForCF2(e) {
        this.setState({
            contentForCF2: e.target.getContent()
        })
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
                content : this.state.content,
                "customField.field_1": this.state.contentForCF1,
                "customField.field_2": this.state.contentForCF2
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
            content = this.state.content,
            contentForCF1 = this.state.contentForCF1,
            contentForCF2 = this.state.contentForCF2;

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
                        <label htmlFor="page-content">Intro Content</label>
                        <TinyMCE
                            content={content}
                            config={{
                                plugins: 'autolink link image lists preview code',
                                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | image link | code',
                                menubar: false,
                                statusbar: false,
                                height: '250px'
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-content">Bev Bio Content</label>
                        <TinyMCE
                            content={contentForCF1}
                            config={{
                                plugins: 'autolink link image lists preview code',
                                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | image link | code',
                                menubar: false,
                                statusbar: false,
                                height: '250px'
                            }}
                            onChange={this.handleEditorChangeForCF1}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-content">Our Mission Content</label>
                        <TinyMCE
                            content={contentForCF2}
                            config={{
                                plugins: 'autolink link image lists preview code',
                                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | image link | code',
                                menubar: false,
                                statusbar: false,
                                height: '250px'
                            }}
                            onChange={this.handleEditorChangeForCF2}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Edit Page"/>
                </form>

            </div>
        );

    }

}

EditPageFormAboutUs.displayName = "EditPageFormAboutUs";

export default EditPageFormAboutUs;