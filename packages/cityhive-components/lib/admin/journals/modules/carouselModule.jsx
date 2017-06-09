import React, {PropTypes, Component} from 'react';
import UploadModuleImage from './upload-module-image'


class CarouselModule extends Component {
	constructor(props) {
        super(props);
        this.state = {
            carouselImages: [],
        };
        this.addImage = this.addImage.bind(this);
    }

    componentWillMount(){
    	if(this.props.value){
    		let carouselImages = [];
    		this.props.value.map((index) =>{
    			carouselImages = carouselImages.concat(UploadModuleImage);
    		})
    		this.setState({ carouselImages });
    	}
    }

   addImage(e) {
     	let carouselImages = this.state.carouselImages.concat(UploadModuleImage);
      	this.setState({ carouselImages });
   }

	render() {
		props = this.props;
		const carouselImages = this.state.carouselImages.map((Element, index) => {
         return <Element
         		key= {"carousel"+index}
            	moduleType="CarouselModule"
            	index={props.index}
            	count = {index+1}
            	value = {props.value?props.value[index]:''} 
            	moduleDict = {props.moduleDict}
          />
     });
      return (
       	<div className="document-{props.index}">
      			<label htmlFor="carousel-module">Module Type</label>
      			<br />
      			<select className="form-control" id="carousel-module" disabled>
 						<option value="carouselModule">Carousel Module</option>
				</select>
				<br />
				<button type="button" onClick={this.addImage}>Add Image</button>
				{ carouselImages }
				<br />
      			<button type="button" className="pull-right" onClick={props.deleteModule.bind(this, props.index, `module${this.props.index}`)}>Remove Module</button>
      			<div className="clearfix" />
      		</div>
      );
    }
}

CarouselModule.displayName = "CarouselModule";

export default CarouselModule;