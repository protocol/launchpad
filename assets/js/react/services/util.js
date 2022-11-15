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

export const parseList = (listAsString) => {
  if (!listAsString) {
    return []
  }

  return listAsString.replace('[', '').replace(']', '').split(' ')
}

export const parseBoolean = booleanAsString => {
  return booleanAsString === 'true'
}

export const parseHugoMap = mapAsString => {
  const regex = mapAsString.match('map\\[(.*)\\]')
  const mapContent = regex[1]
  let obj = {}

  console.log(mapContent)

  const isList = s => {
    return s.match('\\[(.*)\\]')
  }

  const parseElement = element => {
    if (isList(element)) {
      return "list"
    }

    return ""
  }

  for(const mapElement of mapContent.split(':')) {
    const elementPieces = mapElement.split(':')
    console.log(mapElement)
    /*obj = {
      ...obj,
      [elementPieces[0]]: parseElement(elementPieces[1])
    }*/
  }

  return obj
}
