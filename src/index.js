import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

ReactDOM.render(
  <React.StrictMode>
    <App pokedex={P} />
  </React.StrictMode>,
  document.getElementById("root")
);
