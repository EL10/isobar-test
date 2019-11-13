import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers"; // Gets the State from the reducer(s)
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
 
const store = createStore(
  reducer,
  persistedState,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
); // Creates the store from the State received from the reducer(s)

store.subscribe(() => {
  saveState(store.getState());
});

export default store;