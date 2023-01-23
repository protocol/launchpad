import ReactDOM from "react-dom/client";
import React from "react";
import {App, buildAppComponent} from "../components/App";

export const LEVELS = ['shallow', 'deep']

export const getDataAttribute = (id, attribute) => {
  const element = document.getElementById(id)
  return element.dataset[attribute]
}

export const hideElement = id => {
  const content = document.getElementById(id)
  content.style.display = "none"
}

export const getDataAttributeFromContainer = (container, attribute) => {
  return container.dataset[attribute]
}

export const renderComponent = (component, containerId) => {
  const container = document.getElementById(containerId);

  const root = ReactDOM.createRoot(container);
  root.render(component)
}

export const renderComponents = (component, fetchData, containerIdPrefix) => {
  const containers = document.querySelectorAll('[id^="' + containerIdPrefix + '"]');

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]
    const root = ReactDOM.createRoot(container);
    root.render(buildAppComponent(component, fetchData, container))
  }
}

export const parseList = (listAsString) => {
  if (!listAsString) {
    return []
  }

  return listAsString.replace('[', '').replace(']', '').split(' ')
}

export const parseBoolean = booleanAsString => {
  return booleanAsString === 'true'
}

export const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.substring(1, text.length)
}

