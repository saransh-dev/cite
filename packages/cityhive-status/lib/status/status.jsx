import React, {PropTypes, Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import StatusField from './statusfield.jsx';
import StatusItemList from './statusItemList.jsx';
import {Status} from '../collection.js';
import Telescope from 'meteor/nova:lib';
import statusComposer from './statusComposer';

require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

class Statuss extends Component {
    constructor(props) {
      super(props);
    }
    hiddenStatus() {
        let status = this.props.status;
        return status && status.visible == 3;
    }

    writeStatus() {
        let status = this.props.status;
        let elem = status ? <Telescope.components.StatusItem status={status}/> : <span className="no-status"><p>You haven’t written a status yet.</p><p>A status is a good way to express your current mood to the rest of your hive.</p></span>;
        return elem;
    }

    render(props, context) {
        let status = this.props.status;
        return (
            <div>
                {this.props.ready && !this.hiddenStatus() ?
                    <div className="status">
                      <label className='profile-label'>Latest post: &nbsp;{moment(this.props.status.createdAt).format("DD MMM YYYY")}</label>
                        {/*this.writeStatus()*/}
                        {<div className="statusItem" dangerouslySetInnerHTML={{__html: this.props.status.content }}></div>}
                    </div>
                    : <div className="status"><p>Loading</p></div>
                }
            </div>
        )

    }

}

module.exports = statusComposer(Statuss);
export default statusComposer(Statuss);
