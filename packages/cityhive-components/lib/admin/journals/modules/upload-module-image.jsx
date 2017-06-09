import React, {PropTypes, Component} from 'react';
import Telescope from 'meteor/nova:lib';
import Dropzone from 'react-dropzone';
import 'whatwg-fetch';

class UploadModuleImage extends Component {

    constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.clearImage = this.clearImage.bind(this);

    this.state = {
      preview: '',
      uploading: false,
      value: props.value || '',
      imageArray:  [],
    }
  }

  onDrop(files) {
    // set the component in upload mode with the preview
     this.setState({
          preview: files[0].preview,
          uploading: true,
          value: '',
        });
    
        // request url to cloudinary
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${Telescope.settings.get("cloudinaryCloudName")}/upload`;
    
        // request body
        const body = new FormData();
        body.append("file", files[0]);
        body.append("upload_preset", Telescope.settings.get('cloudinaryPresets').journal);
    
        // post request to cloudinary
        fetch(cloudinaryUrl, {
          method: "POST",
          body,
        })
        .then(res => res.json()) // json-ify the readable strem
        .then(body => {
          // use the https:// url given by cloudinary
          const avatarUrl = body.secure_url;
          
          // set the uploading status to false
          this.setState({
            preview: '',
            uploading: false,
            value: avatarUrl,
          });

          let imageArray = this.state.imageArray.slice();
          imageProps = this.props.moduleDict.get(`module${this.props.index}`)
          if(imageProps){
           for(i in imageProps.value)
             imageArray.push(imageProps.value[i])
          }
          imageArray.push(avatarUrl)
          this.setState({ imageArray: imageArray });

          this.props.moduleDict.set(`module${this.props.index}`, {moduleType:this.props.moduleType, value:this.state.imageArray});
          this.props.name = avatarUrl;
        })
        .catch(err => console.log("err", err));
   }

  clearImage(e) {
      e.preventDefault();
      let imageArray = this.state.imageArray.slice(),
          imageProps = this.props.moduleDict.get(`module${this.props.index}`);

      if(imageProps){
          for(i in imageProps.value)
             imageArray.push(imageProps.value[i])
      }

      imageArray.pop(this.props.value);
      this.setState({ imageArray: imageArray });
      if(imageArray.length == 0)
          this.props.moduleDict.delete(`module${this.props.index}`);
      else
          this.props.moduleDict.set(`module${this.props.index}`, {moduleType:this.props.moduleType, value:imageArray});
      this.props.name= '';
      this.setState({
          preview: '',
          value: '',
      });
  }

	render() {
		props = this.props;
     const { uploading, preview, value } = this.state;
    // show the actual uploaded image or the preview
      const image = preview || value;
       return (
       		<div className="form-group row">
                  <label className="control-label col-sm-3">{props.count? "Image "+props.count:''}</label>
                  <div className="col-sm-9">
                    <div className="upload-field">
                      <Dropzone ref="dropzone" 
                        multiple={false} 
                        onDrop={this.onDrop}
                        accept="image/*"
                        className="dropzone-base"
                        activeClassName="dropzone-active"
                        rejectClassName="dropzone-reject"
                      >
                        <div>Drop an image here, or click to select an image to upload.</div>
                      </Dropzone>
                      
                      {image ? 
                        <div className="upload-state">
                          {uploading ? <span>Uploading... Preview:</span> : null}
                          {value ? <a onClick={this.clearImage}><Telescope.components.Icon name="close"/> Remove image</a> : null}
                          <img style={{height: 120}} src={image} />
                        </div> 
                      : null}
                    </div>
                  </div>
                </div>
       	);

    }

}

UploadModuleImage.displayName = "UploadModuleImage";

export default UploadModuleImage;