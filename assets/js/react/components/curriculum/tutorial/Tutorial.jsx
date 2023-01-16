import {hideElement, renderComponent} from "../../../services/util";
import {App} from "../../App";
import React, {useEffect, useState} from "react";

const Tutorial = () => {

  const [tutorialData, setTutorialData] = useState(null)

  const showDynamicTutorial = e => {
    hideElement("page-content")
    const data = e.detail

    setTutorialData(data)
  }

  useEffect(() => {
    return window.addEventListener('showDynamicTutorial', showDynamicTutorial)
  }, [])

  return <>
    {tutorialData !== null && <div className="dynamic-tutorial">
      <div className="notice">
        <img src="/icons/tutorial-book.png" width="35" height="35" />
        <span style={{marginLeft: '10px', fontSize: '19px'}}>This tutorial was originally posted in the <a href="/tutorials" target="__blank">Launchpad Tutorials</a> section.</span>
      </div>
      <h1>{tutorialData.title}</h1>
      <div dangerouslySetInnerHTML={{__html: tutorialData.content}}></div>
    </div>}
  </>
}


renderComponent(<App component={Tutorial} fetchData={undefined} />, "dynamic-tutorial")
