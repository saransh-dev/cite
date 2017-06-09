import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import {browserHistory} from 'react-router';

class CreateArticleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(e) {
        this.setState({
            content: e.target.getContent()
        })
    }

    formSubmit(e) {
        e.preventDefault();

        let articleDocument = {
            title: this.refs.articleTitle.value,
            content: this.state.content
        };

        Meteor.call('articles.create', articleDocument, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Article Created', 'success');
                    browserHistory.push('/admin/articles');
                }
            }
        });

    }

    render(props, context) {

        return (
            <div className="create-article-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="article-title">Article Title</label>
                        <input ref="articleTitle" id="article-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="article-content">Content</label>
                        <TinyMCE
                            content={this.state.content}
                            config={{
                                plugins: 'autolink link image lists preview',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                                menubar: false,
                                statusbar: false
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <input type="submit" value="Create Article"/>
                </form>

            </div>
        );

    }

}

CreateArticleForm.displayName = "CreateArticleForm";

export default CreateArticleForm;