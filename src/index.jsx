import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import {reducer as formReducer} from 'redux-form';

//import components and containers
import CarsIndex from './containers/Cars';
import CarsNew from './containers/CarsNew';
import CarsShow from './containers/CarsShow';

//import reducers
import carsReducer from './reducers/carsReducer';

import '../assets/stylesheets/application.scss';

const garageName = prompt("What is your garage?") || `garage${Math.floor(10 + (Math.random() * 90))}`;
const initialState = {
  garage: garageName,
  cars: []
};

const reducers = combineReducers({
  garage: (state = null, action) => state,
  cars: carsReducer,
  form: formReducer
  // key: reducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CarsIndex}/>
        <Route path="/cars/new" exact component={CarsNew}/>
        <Route path="/cars/:id" exact component={CarsShow}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
