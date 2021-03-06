import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppContainer from "./containers/AppContainer";
import { PersistGate } from "redux-persist/integration/react";
import persistedStore from "./store";

const { store, persistor } = persistedStore();

ReactDOM.render(
  <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContainer />
        </Router>
      </PersistGate>
    </Provider>
  </div>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
