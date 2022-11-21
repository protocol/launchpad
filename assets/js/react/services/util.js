import ReactDOM from "react-dom/client";
import React from "react";

export const LEVELS = ['shallow', 'deep']

export const getDataAttribute = (id, attribute) => {
  const element = document.getElementById(id)
  return element.dataset[attribute]
}

export const renderComponent = (component, containerId) => {
  const container = document.getElementById(containerId);

  const root = ReactDOM.createRoot(container);
  root.render(component)
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

