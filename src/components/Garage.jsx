import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Garage extends Component{
  render(){
    return(
      <div className="garage-box">
        <h1>{this.props.garageName}</h1>
        <p>Our garage is the best. Reasonable Prices, always on time, we are the best (and fictionnal).</p>
        <Link className="btn btn-primary btn-cta" to="/">
          Back to list
        </Link>
      </div>
    );
  }
}

export default Garage;
