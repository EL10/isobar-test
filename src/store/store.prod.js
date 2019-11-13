import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import reducer from "../reducers"; // Gets the State from the reducer(s)

const store = createStore(reducer); // Creates the store from the State received from the reducer(s)

export default store; 