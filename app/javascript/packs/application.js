import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import React from "react";
import { createRoot } from "react-dom/client";

import SnippetsGame from "../components/SnippetsGame";
import MainComponent from '../components/MainComponent';
import DifficultySlider from '../components/DifficultySlider';
import InviteFriend from "../components/InviteFriend";
import SnippetCard from "../components/SnippetCard";

import "bootstrap/dist/css/bootstrap";
import "bootstrap";

import "../stylesheets/application.scss";

Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  // Mount SnippetsGame
  const container = document.getElementById('snippets-game');
  if (container) {
    console.log('Mounting SnippetsGame component');
    const root = createRoot(container);
    const gameSessionId = container.dataset.gameSessionId || null;
    root.render(<SnippetsGame game_session_id={gameSessionId} />);
  }

  // Mount InviteFriend
  const inviteFriendElement = document.getElementById('invite-friend');
  if (inviteFriendElement) {
    console.log('Mounting InviteFriend component');
    const root = createRoot(inviteFriendElement);
    root.render(<InviteFriend />);
  }

  // Mount SnippetCard for thank_you view
  const snippetLastElement = document.getElementById("snippet-last");
  if (snippetLastElement && snippetLastElement.dataset.snippet) {
    console.log("Mounting SnippetCard for thank_you view");
    const snippetData = JSON.parse(snippetLastElement.dataset.snippet)
    const root = createRoot(snippetLastElement);
    root.render(
      <SnippetCard
        snippet={snippetData}
        onClick={() => {}}
      />
    )
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Mount MainComponent
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('Mounting MainComponent');
    const gameSessionId = rootElement.dataset.gameSessionId;
    const root = createRoot(rootElement);
    root.render(<MainComponent gameSessionId={gameSessionId} />);
  }

  // Mount DifficultySlider
  const sliderElement = document.getElementById('difficulty-slider');
  if (sliderElement) {
    console.log('Mounting DifficultySlider component');
    const root = createRoot(sliderElement);
    root.render(<DifficultySlider />);
  }
});
