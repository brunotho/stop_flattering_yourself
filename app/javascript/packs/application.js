import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import React from "react";
import ReactDOM from "react-dom";

import SnippetsGame from "../components/SnippetsGame";
import MainComponent from '../components/MainComponent';
import DifficultySlider from '../components/DifficultySlider';

import "bootstrap/dist/css/bootstrap";
import "bootstrap";

import "../stylesheets/application.scss";


Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  const container = document.getElementById('snippets-game');
  if (container) {
    ReactDOM.render(<SnippetsGame />, container);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<MainComponent />, rootElement);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sliderElement = document.getElementById('difficulty-slider');
  if (sliderElement) {
    ReactDOM.render(<DifficultySlider />, sliderElement);
  }
});
