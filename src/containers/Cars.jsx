import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';

import Garage from '../components/Garage';

import {fetchCars} from '../actions'

class CarsIndex extends Component {
  componentWillMount(){
    this.props.fetchCars(this.props.garageName);
  }

  renderCarList(){
    return(
      <div className="cars-box">
        {this.props.cars.map((car) => {
          return(
            <Link to={`/cars/${car.id}`} key={car.id}>
              <div>
                <h3>{`${car.brand} - ${car.model}`}</h3>
                <h4>{`Owner: ${car.owner}`}</h4>
              </div>
            </Link>
          );
        })}
        <Link className="btn btn-primary btn-cta" to="/cars/new">
          Add Car
        </Link>
      </div>
    );
  }

  render(){
    return(
      <div className="cars-layout">
        <Garage garageName={this.props.garageName}/>
        {this.renderCarList()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchCars},dispatch);
}

function mapStateToProps(state){
  return{
    garageName: state.garage,
    cars: state.cars
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CarsIndex);
