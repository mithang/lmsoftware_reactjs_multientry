import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";
import Rate from "./Rate";

// ReactDOM.render(<Rate />, document.getElementById("rate"));

import reportWebVitals from '../reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Rate />
  </React.StrictMode>,
  document.getElementById('rate')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

reportWebVitals();