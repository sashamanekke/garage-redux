import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import components
import Garage from '../components/Garage';
//import action creators
import {fetchCar} from '../actions';

class CarsShow extends Component{

  componentWillMount(){
    if (!this.props.car){
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  renderCar(){
    let {brand, model, owner, plate} = this.props.car;
    return(
      <div className="car-box">
        <h3>{`${brand} - ${model}`}</h3>
        <h4>{`Owner: ${owner}`}</h4>
        <h4>{plate}</h4>
      </div>
    );
  }

  render(){
    return(
      <div className="cars-layout">
        <Garage garageName={this.props.car.garage}/>
        {this.renderCar()};
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchCar},dispatch);
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const car = state.cars.find(p => p.id === idFromUrl);
  return { car };
}

export default connect(mapStateToProps,mapDispatchToProps)(CarsShow);
