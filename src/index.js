import App from "./app";
import React from "react"; // eslint-disable-line no-unused-vars
import { render } from "react-dom";
import { injectGlobal } from "emotion";

injectGlobal`
  * {
    box-sizing: border-box;
    outline: none;
  }

  body {
    padding: 18px;
    font-family: sans-serif;
    color: #333;;
  }

`;

document.addEventListener("DOMContentLoaded", () => {
  render(<App/>, document.getElementById("app-container"));
});
