import React, {Component} from 'react';
import axios from 'axios';
//import classNames from 'classnames';

/* Import Components */
import CheckBox from '../controls/CheckBox';
import Input from '../controls/Input';
import TextArea from '../controls/TextArea';
import Button from '../controls/Button'
import Errors from '../controls/Errors'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newField: {
        label: '',
        type: 'Multi-Select',
        required: false,
        default: '',
        displayAlpha: false,
        options: [],
      },
      errors: {}
    }

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
handleInput(e) {
  let value = e.target.value;
  let name = e.target.name;
  let label = e.target.title;
  let required = e.target.required;


  if(required && value.length < 1 ) {
    let errorMessage = `${label} is required.`

    this.setState( prevState => ({ errors :
      {...prevState.errors, [name]: errorMessage}
    }), () => console.log(this.state))
  }

  if(required && value.length > 0 ) {
    this.setState(prevState => {
      let errors = Object.assign({}, prevState.errors)
      delete errors[name]
      return {errors}
    })
  }


  this.setState( prevState => ({newField :
    {...prevState.newField, [name]: value}
  }), () => console.log(this.state.newField))
}


  handleTextArea(e) {
    console.log("handleTextArea");
    let value = e.target.value;
    let name = e.target.name;

    if((value.match(/\n/g) || []).length > 5) {
      let errorMessage = `Only 50 ${name} are allowed.`

      this.setState( prevState => ({ errors :
        {...prevState.errors, [name]: errorMessage}
      }), () => console.log(this.state))
    }

    if((value.match(/\n/g) || []).length <= 5) {
      this.setState(prevState => {
        let errors = Object.assign({}, prevState.errors)
        delete errors[name]
        return {errors}
      })
    }

    this.setState(prevState => ({
      newField: {...prevState.newField, [name]: value}
    }), ()=>console.log(this.state.newField))
  }

  handleCheckBox(e) {
    let name = e.target.name
    let checked = e.target.checked

    this.setState( prevState => ({newField :
      {...prevState.newField, [name]: checked}
    }), () => console.log(this.state.newField))

  }

  handleFormSubmit(e) {
    e.preventDefault();

    console.log('*** submitted ***');
    console.log(this.state.newField.displayAlpha);
    console.log(this.state.newField.options);

    let optionsDefault = this.state.newField.default;
    let optionsString = this.state.newField.options;
    let optionsArray = [];

    if(optionsString.length > 0) {
      let sortAlpha = this.state.newField.displayAlpha;
      optionsArray = optionsString.split("\n");

      if(!optionsArray.includes(optionsDefault)){
        optionsArray.unshift(optionsDefault);
      }

      if(sortAlpha === true){
        optionsArray = optionsArray.sort();
      }

      console.log('****');
      console.log((new Set(optionsArray)).size !== optionsArray.length);

    }

    if((new Set(optionsArray)).size !== optionsArray.length) {
      let errorMessage = `Duplicate entries are not allowed.`
      this.setState( prevState => ({ errors :
        {...prevState.errors, 'duplicates': errorMessage}
      }), () => console.log(this.state))
    }

    if(this.state.newField.options.length > 5) {
      let errorMessage = `Only 50 options are allowed.`
      this.setState( prevState => ({ errors :
        {...prevState.errors, 'options': errorMessage}
      }), () => console.log(this.state))
    }

    if(this.state.newField.label.length < 1 ) {
      let errorMessage = `A field label is required.`

      this.setState( prevState => ({ errors :
        {...prevState.errors, 'label': errorMessage}
      }), () => console.log(this.state))
    }

    if(Object.keys(this.state.errors).length > 0){
      console.log('error')
    } else {
      console.log('success');

      let data = this.state.newField

      console.log(data);

      axios.post('http://www.mocky.io/v2/566061f21200008e3aabd919', data)
        .then(function (response) {
          console.log(response);
        }).catch(err => console.log(err))
    }
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    newField: {
      label: '',
      id: '',
      type: 'Multi-Select',
      required: false,
      default: '',
      displayAlpha: false,
      options: [],
    },
    errors: {},
    })
  }

  render() {
    return (
    <form noValidate onSubmit={this.handleFormSubmit}>
      <div  className = "row">
        <Errors errors={this.state.errors} />
      </div>
      <div className = "row">
        <div className = "col-md-6">
          <Input title = {'Label'}
            type = {'text'}
            name = {'label'}
            id = {'label'}
            value = {this.state.newField.label}
            placeholder = {'Sales Region'}
            onChange={this.handleInput}
            error = {this.state.errors['label'] ? this.state.errors['label'] : ""}
            helptext = {'The title of the form field'}
            required
          /> {/* Field Label */}
        </div>
        <div className = "col-md-6">
          <Input title = {'Field Type'}
            type = {'text'}
            name = {'type'}
            id = {'type'}
            defaultValue = {this.state.newField.type}
            onChange={this.handleInput}
            error = {this.state.errors['type'] ? this.state.errors['type'] : ""}
            helptext = {'The input type of the field'}
            readOnly
          /> {/* Field Type */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <CheckBox title = {'Required'}
            name = {'required'}
            id = {'required'}
            onChange = {this.handleCheckBox}
          /> {/* Required Field */}
        </div>
        <div className="col-md-6">
          <CheckBox  title={'Sort Alphabetically'}
            name = {'displayAlpha'}
            id = {'displayAlpha'}
            onChange = {this.handleCheckBox}
            /> {/* Dispaly Alphabetically */}
        </div>
      </div>
      <Input title = {'Default Value'}
        type = {'text'}
        name = {'default'}
        id = {'default'}
        value = {this.state.newField.default}
        placeholder = {'Default Value'}
        onChange={this.handleInput}
        error = {this.state.errors['default'] ? this.state.errors['default'] : ""}
        helptext = {'The default value for the select list'}
      /> {/* Default Value */}
      <TextArea
        title={'Options'}
        rows={10}
        options={this.state.newField.options}
        name={'options'}
        handleChange={this.handleTextArea}
        error = {this.state.errors['options'] ? this.state.errors['options'] : ""}
        placeholder={'Options, one per line'}
      />{/* Options */}
      <Button
        action = {this.handleFormSubmit}
        type = {'primary'}
        title = {'Create'}
      /> { /*Submit */ }
      <Button
        action = {this.handleClearForm}
        type = {'secondary'}
        title = {'Clear'}
      /> {/* Clear the form */}
    </form>
    );
  }
}

export default FormContainer;
