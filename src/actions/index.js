// TODO: add and export your own actions
const ROOT_URL = 'https://wagon-garage-api.herokuapp.com/';
// no api key needed for the moment
//const API_KEY = 'LEWAGON-BLOG';

export const FETCH_CARS = 'FETCH_CARS';
export const CREATE_CAR = 'CREATE_CAR';
export const FETCH_CAR = 'FETCH_CAR';
export const DELETE_CAR = 'DELETE_CAR';

export function fetchCars(garageName){
  const promise = fetch(`${ROOT_URL}${garageName}/cars`)
    .then(r => r.json());

  return{
    type: FETCH_CARS,
    payload: promise
  }
}

export function fetchCar(id){
  const promise = fetch(`${ROOT_URL}/cars/${id}`)
    .then(r => r.json());

  return{
    type: FETCH_CAR,
    payload: promise
  }
}

export function createCar(body, callback, garageName){
  const request = fetch(`${ROOT_URL}${garageName}/cars`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  }).then(r => r.json())
    .then(callback);

  return{
    type: CREATE_CAR,
    payload: request
  }
}

export function deleteCar(id, car){
  const promise = fetch(`${ROOT_URL}/cars/${id}`,{
    method: 'DELETE'
  }).then(r => r.json());

  return{
    type: DELETE_CAR,
    payload: car
  }
}
