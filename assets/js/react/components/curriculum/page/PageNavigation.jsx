import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom/client";
import {useContentLevel, useCurrentPageId, useSidebarMenuElements} from "../../../services/hooks";
import Spinner from 'react-bootstrap/Spinner';
import {getDataAttribute, getDataAttributeFromContainer} from "../../../services/util";
import {TutorialTrigger} from "../tutorial/TutorialTrigger";

const PageNavigation = () => {

  const currentPageId = useCurrentPageId()
  const sidebarMenuElements = useSidebarMenuElements()

  const [contentLevel, setContentLevel] = useContentLevel()
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    let findPrevious = true
    let findNext = false

    for (let i=0; i<sidebarMenuElements.length; i++) {
      const element = sidebarMenuElements[i]
      const id = element.getAttribute('data-id')

      const levelsAsString = element.getAttribute('data-content-level').replace("[", "").replace("]", "")
      const levels = Array.from(levelsAsString.split(" "))

      if (findPrevious && id !== currentPageId && (levels.includes(contentLevel) || !contentLevel)) {
        setPrevious(sidebarMenuElements[i])
      }

      if (findNext && (levels.includes(contentLevel) || !contentLevel)) {
        setNext(sidebarMenuElements[i])
        break
      }

      if (id === currentPageId) {
        findPrevious = false
        findNext = true
      }
    }
  }, [])

  const getHref = element => {
    const link = element.querySelector('a')
    return link.href
  }

  const composePreviousButton = previous => {
    return <div className="card my-1">
      <div className="card-body py-2">
        {getDataAttributeFromContainer(previous, "title")}
      </div>
    </div>
  }

  const composeNextButton = previous => {
    return <div className="card my-1">
      <div className="card-body py-2">
        {getDataAttributeFromContainer(previous, "title")}
      </div>
    </div>
  }

  const composeButton = previous => {
    const title = getDataAttributeFromContainer(previous, "title")

    const button = <div className="card my-1">
      <div className="card-body py-2">
        {title}
      </div>
    </div>

    if (getDataAttributeFromContainer(previous, "category") === "tutorial") {
      const id = getDataAttributeFromContainer(previous, "id")
      const content = document.getElementById("content-curriculum-tutorial-trigger-" + id).innerHTML

      return <a href="#"><TutorialTrigger title={title} content={content} button={button} /></a>
    }

    return <a href={getHref(previous)}>
      {button}
    </a>
  }

  return <>
    {(previous === null && next === null) && <Spinner animation="border" role="status" />}
    {(previous !== null || next !== null) && <div className="docs-navigation d-flex justify-content-between">
      {previous !== null && composeButton(previous)}
      {next !== null && composeButton(next)}
    </div>}
  </>
}

const container = document.getElementById('page-navigation');
const root = ReactDOM.createRoot(container);
root.render(<PageNavigation />)
