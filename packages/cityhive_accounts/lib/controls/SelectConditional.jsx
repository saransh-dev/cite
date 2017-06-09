import React, { PropTypes, Component } from 'react';

class SelectConditional extends Component {

    componentWillMount() {
        this.context.addToAutofilledValues({[this.props.name]: this.props.value || ''});
    }

    componentDidMount() {
        //console.log(this.refs[this.props.name].value);
    }

    render() {

        const options = this.props.options;

        return (
            <div className="form-group row">
                <label className="col-form-label col-sm-3">{this.props.label}</label>
                <div className="col-sm-9">
                    <select
                        ref={(ref) => this.formControl = ref}
                        name={this.props.name}
                        onChange={e => { this.context.addToAutofilledValues({[this.props.name]: e.target.value}) }}
                        className="form-control"
                        required>
                            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </div>
            </div>
        );
    }
}

SelectConditional.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    options: React.PropTypes.array,
    datatype: React.PropTypes.any

};

SelectConditional.contextTypes = {
    addToAutofilledValues: React.PropTypes.func
};

export default SelectConditional;