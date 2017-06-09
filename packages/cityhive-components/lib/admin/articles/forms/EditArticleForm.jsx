import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";

class EditArticleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.document.content
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

        let articleDocument = this.props.document;

        let modifier = {
            $set : {
                title : this.refs.articleTitle.value,
                content : this.state.content
            }
        };

        Meteor.call('articles.edit', articleDocument._id, modifier, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Article Edited', 'success');
                }
            }
        });

    }

    render() {

        let title = this.props.document.title,
            slug = this.props.document.slug,
            menuInclude = this.props.document.menuInclude,
            menuWeight = this.props.document.menuWeight,
            content = this.state.content;

        return (
            <div className="create-article-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="article-title">Article Title</label>
                        <input defaultValue={title} ref="articleTitle" id="article-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="article-content">Content</label>
                        <TinyMCE
                            content={content}
                            config={{
                                plugins: 'autolink link image lists preview',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                                menubar: false,
                                statusbar: false
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <input type="submit" value="Edit Article"/>
                </form>

            </div>
        );

    }

}

EditArticleForm.displayName = "EditArticleForm";

export default EditArticleForm;