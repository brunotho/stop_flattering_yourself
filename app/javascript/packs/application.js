import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import React from "react";
import ReactDOM from "react-dom";
import SnippetsGame from "../components/SnippetsGame";
import "bootstrap/dist/css/bootstrap";
import "bootstrap";

Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  const container = document.getElementById('snippets-game');
  if (container) {
    ReactDOM.render(<SnippetsGame />, container);
  }
});
