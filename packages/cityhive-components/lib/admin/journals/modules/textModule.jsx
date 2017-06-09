import React, {PropTypes, Component} from 'react';

require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class TextModule extends Component {
	 constructor(props) {
        super(props);
        this.state = {
            model: this.props.value?this.props.value[0]:'' || '',
        };
			this.handleModelChange = this.handleModelChange.bind(this);
    }

    handleModelChange(model) {
    	this.setState({model: model});
    	this.props.moduleDict.set(`module${this.props.index}`, {moduleType:"TextModule", value:[model]});
    }

	render() {
		props = this.props;
       return (
       		<div className="document-{props.index}">
       			<label htmlFor="text-module">Module Type</label>
       			<br />
       			<select className="form-control" id="text-module" disabled>
  						<option value="textModule" >Text Module</option>
					</select>
					<br />
					<textarea defaultValue={this.state.model} className="hidden-xs-up" placeholder="Write your text"></textarea>
                <FroalaEditor
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                    config= {{
                      key: 'zpB-8aoC-21qoF-11A2C-9rB2jk==',
                      pluginsEnabled: ['link', 'emoticons'],
                      placeholderText: 'Write your text',
                      charCounterCount: false,
                      height: '150px',
                      toolbarInline: false,
                      toolbarBottom: true,
                      toolbarButtons: ['emoticons', 'insertLink'],
                      quickInsertButtons: false,
                      linkAlwaysBlank: true,
                      linkEditButtons: ['linkEdit', 'linkRemove'],
                    }}
                />
                <br/>
       			<button type="button" className="pull-right" onClick={props.deleteModule.bind(this, props.index, `module${this.props.index}`)}>Remove Module</button>
       			<div className="clearfix" />
       		</div>
       	);

    }

}

TextModule.displayName = "TextModule";

export default TextModule;