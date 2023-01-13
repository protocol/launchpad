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
    console.log(activeElements.length)
    for (let i = 0; i < activeElements.length; i++) {
      console.log('------ taken')
      const activeElement = activeElements[i]
      console.log(activeElement.classList)
      activeElement.classList.toggle('active')
      console.log(activeElement.classList)

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
