import React from "react"; // eslint-disable-line no-unused-vars
import { render } from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <React.StrictMode>
      <div>Hello World</div>
    </React.StrictMode>,
    document.getElementById("app-container")
  );
});
