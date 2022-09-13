import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";
import Trade from "./Trade";

// ReactDOM.render(<Trade />, document.getElementById("trade"));

import reportWebVitals from '../reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Trade />
  </React.StrictMode>,
  document.getElementById('trade')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

reportWebVitals();