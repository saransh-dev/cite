import React, { PropTypes, Component } from 'react';
import Telescope from 'meteor/nova:lib';
import Dropzone from 'react-dropzone';
import 'whatwg-fetch';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";

class CvUpload extends Component {

    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.clearImage = this.clearImage.bind(this);

        this.state = {
            preview: '',
            uploading: false,
            value: props.value || '',
        }
    }

    componentWillMount() {
        this.context.addToAutofilledValues({[this.props.name]: this.props.value || ''});
    }

    getFileName(path) {
        let name = path.replace(/^.*[\\\/]/, '');
        return name.substring(name.indexOf("-") + 1);
    }

    onDrop(files) {
        // set the component in upload mode with the preview
        let self = this;
        this.setState({
            preview: files[0].preview,
            uploading: true,
            value: '',
        });

        var uploader = new Slingshot.Upload("UsersCV");
        uploader.send(files[0], function (error, downloadUrl) {
            if (error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');

                self.setState({
                    preview: '',
                    uploading: false,
                });
            }
            else {
                //console.log(downloadUrl);
                const fileUrl = downloadUrl;

                // set the uploading status to false
                self.setState({
                    preview: '',
                    uploading: false,
                    value: fileUrl,
                });

                // tell NovaForm to catch the value
                self.context.addToAutofilledValues({[self.props.name]: fileUrl});
            }
        });

    }

    clearImage(e) {
        e.preventDefault();
        this.context.addToAutofilledValues({[this.props.name]: ''});
        this.setState({
            preview: '',
            value: '',
        });
    }

    render() {

        const { uploading, preview, value } = this.state;
        // show the actual uploaded image or the preview
        const image = preview || value;

        return (
            <div className="form-group row">
                <label className="control-label col-sm-3">{this.props.label}</label>
                <div className="col-sm-9">
                    <div className="upload-field">
                        <Dropzone ref="dropzone"
                                  multiple={false}
                                  onDrop={this.onDrop}
                                  accept="application/pdf, application/msword, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel"
                                  className="dropzone-base"
                                  activeClassName="dropzone-active"
                                  rejectClassName="dropzone-reject"
                        >
                            <div>Drop an file here, or click to select an file to upload.</div>
                        </Dropzone>

                        {image ?
                            <div className="upload-state">
                                {uploading ? <span>Uploading... Preview:</span> : null}
                                {value ? <a onClick={this.clearImage}><Telescope.components.Icon name="close"/> Remove document</a> : null}
                                <p>Filename: <strong>{this.getFileName(image)}</strong></p>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

CvUpload.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    label: React.PropTypes.string
};

CvUpload.contextTypes = {
    addToAutofilledValues: React.PropTypes.func,
}

export default CvUpload;