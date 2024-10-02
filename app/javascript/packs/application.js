import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import React from "react";
import { createRoot } from "react-dom/client"

import SnippetsGame from "../components/SnippetsGame";
import MainComponent from '../components/MainComponent';
import DifficultySlider from '../components/DifficultySlider';
import InviteFriend from "../components/InviteFriend";

import "bootstrap/dist/css/bootstrap";
import "bootstrap";

import "../stylesheets/application.scss";


Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  const container = document.getElementById('snippets-game');
  if (container) {
    const root = createRoot(container);
    root.render(<SnippetsGame />);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<MainComponent />);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sliderElement = document.getElementById('difficulty-slider');
  if (sliderElement) {
    const root = createRoot(sliderElement);
    root.render(<DifficultySlider />);
  }
});

document.addEventListener("turbolinks:load", () => {
  const InviteFriendElement = document.getElementById("invite-friend");

  if (InviteFriendElement) {
    const root = createRoot(InviteFriendElement);
    root.render(<InviteFriend />);
  }
})
