import ReactDOM from "react-dom/client";
import {App} from "../components/App";
import React from "react";

export const getDataAttribute = (id, attribute) => {
  const element = document.getElementById(id)
  return element.dataset[attribute]
}

export const renderComponent = (component, containerId) => {
  const container = document.getElementById(containerId);

  const root = ReactDOM.createRoot(container);
  root.render(component)
}
