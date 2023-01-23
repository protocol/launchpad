import {getDataAttributeFromContainer, renderComponents} from "../../../services/util";
import React, {useEffect, useState} from "react";
import {TutorialTriggerButton} from "./TutorialTriggerButton";

export const TutorialTrigger = ({title, content, button = undefined}) => {

  const [activeTrigger, setActiveTrigger] = useState(false)

  useEffect(() => {
    return window.addEventListener('showDynamicTutorial', e => {
      const data = e.detail

      if (data.title === title) {
        setActiveTrigger(true)
      } else {
        setActiveTrigger(false)
      }
    })
  })

  const trigger = () => {
    const activeElements = document.getElementsByClassName("docs-link rounded active");

    for (let i = 0; i < activeElements.length; i++) {
      const activeElement = activeElements[i]
      activeElement.classList.toggle('active')
    }

    window.dispatchEvent(new CustomEvent('showDynamicTutorial', {detail: {title, content}}))
  }

  const onClickWrapper = button => {
    return <div onClick={() => {trigger(); trigger()}}>
      {button}
    </div>
  }

  return onClickWrapper(button === undefined ? <TutorialTriggerButton title={title} active={activeTrigger} /> : button)
}

const fetchData = async (container) => {
  const parent = container.parentNode
  const tutorialId = container.id.split('-')[3]

  const tutorialContent = document.getElementById('content-curriculum-tutorial-trigger-' + tutorialId).innerHTML

  const title = getDataAttributeFromContainer(parent, "title")
  const content = tutorialContent

  return {
    title,
    content
  }
}

renderComponents(TutorialTrigger, fetchData, "curriculum-tutorial-trigger")
