import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import axios from 'axios';

const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/';

const initialPokemonState = {
  pokemon: [],
};

const initialUserState = {
  user: null,
  email: '',
  admin: 'false',
};

const initialStarWarsState = {
  characters: ['luke'],
};

//actions
const pokemonTypes = {
  GET_POKEMON: 'GET_POKEMON',
  UPDATE_POKEMON: 'UPDATE_POKEMON',
};

const userTypes = {
  GET_USER: 'GET_USER',
};

const starWarsTypes = {
  GET_SW_CHARACTERS: 'GET_SW_CHARACTERS',
};

const promiseDelay = (cb) => {
  return new Promise((res, rej) =>
    window.setTimeout(() => {
      cb().then((results) => {
        const shouldFail = getShouldFail();
        console.log('shoould fail');
        if (shouldFail) {
          rej();
        } else {
          res(results);
        }
      });
    }, 2000),
  );
};

const getShouldFail = (content) => {
  // const randomNumber = Math.ceil(Math.random() * 10);
  // if (randomNumber > 4) {
  //   return true;
  // }
  return true;
};

//action creators
export const getPokemon = () => {
  const catchEmAll = () =>
    Promise.all(
      Array.from({ length: 150 }).map((_, i) =>
        axios.get(`${POKEAPI}${i + 1}`).then((res) => res.data),
      ),
    );

  return {
    type: pokemonTypes.GET_POKEMON,
    payload: promiseDelay(catchEmAll),
  };
};

//reducers
const pokemonReducer = (state = initialPokemonState, action) => {
  switch (action.type) {
    case `${pokemonTypes.GET_POKEMON}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case `${pokemonTypes.GET_POKEMON}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: 'pokemon had a problem loading',
      };
    case `${pokemonTypes.GET_POKEMON}_FULFILLED`:
      return {
        loading: false,
        pokemon: action.payload,
      };
    case pokemonTypes.UPDATE_POKEMON:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case userTypes.GET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const starWarsReducer = (state = initialStarWarsState, action) => {
  switch (action.type) {
    case starWarsTypes.GET_SW_CHARACTERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({ userReducer, pokemonReducer, starWarsReducer }),
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);
