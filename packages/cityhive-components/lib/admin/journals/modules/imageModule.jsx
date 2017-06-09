import React, {PropTypes, Component} from 'react';
import UploadModuleImage from './upload-module-image'


class ImageModule extends Component {
   constructor(props) {
        super(props);
        this.state = {
            value: this.props.value?this.props.value[0]:'' || '',
        };
   }

	render() {
		props = this.props;
       return (
      		<div className="document-{props.index}">
      			<label htmlFor="image-module">Module Type</label>
      			<br/>
      			<select className="form-control" id="image-module" disabled>
 						<option value="imageModule">Image Module</option>
				</select>
				<br/>
                <UploadModuleImage 
                  label="Upload Image" 
                  moduleType="ImageModule" 
                  index={props.index} 
                  value = {this.state.value}
                  moduleDict = {props.moduleDict}
                  />
      			<button className="pull-right" onClick={props.deleteModule.bind(this, props.index, `module${this.props.index}`)}>Remove Module </button>
      			<div className="clearfix" />
      		</div>
      	);
    }
}

ImageModule.displayName = "ImageModule";

export default ImageModule;