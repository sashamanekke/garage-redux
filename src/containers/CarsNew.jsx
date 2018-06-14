import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import Garage from '../components/Garage';

import {createCar} from '../actions'

//for validation
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const required = value => value ? undefined : 'Required'

class CarsNew extends Component {

  onSubmit = (values) => {
    this.props.createCar(values, (post) => {
      this.props.history.push('/'); // Navigate after submit
      return post;
    },this.props.garageName);
  }

  renderField({label, type, input, meta: { touched, error, warning }}) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...input}
          placeholder={label}
        />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }

  renderForm(){
    return(
      <div className="form-box">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Brand"
            name="brand"
            type="text"
            component={this.renderField}
            validate={[ required, maxLength15 ]}
          />
          <Field
            label="Model"
            name="model"
            type="text"
            component={this.renderField}
            validate={number}
          />
          <Field
            label="Onwer"
            name="owner"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Plate"
            name="plate"
            type="text"
            component={this.renderField}
            validate={number}
          />
          <button className="btn btn-primary" type="submit"
            disabled={this.props.pristine || this.props.submitting}>
            Add Car
          </button>
        </form>
      </div>
    );
  }

  render(){
    return(
      <div className="cars-layout">
        <Garage garageName={this.props.garageName}/>
        {this.renderForm()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    garageName: state.garage,
  };
}

export default reduxForm({form: 'newCarForm'})(connect(mapStateToProps, {createCar})(CarsNew));
