import {renderComponent} from "../../../services/util";
import {App} from "../../App";
import React, {useEffect, useState} from "react";

const Tutorial = () => {

  const [showTutorial, setShowTutorial] = useState(false)

  const showDynamicTutorial = e => {
    const content = document.getElementById("page-content")
    content.style.display = "none"
    const data = e.detail
    setShowTutorial(true)
  }

  useEffect(() => {
    return window.addEventListener('showDynamicTutorial', showDynamicTutorial)
  }, [])

  return <>
    {showTutorial && <div style={{width: '100%', height: '100%', zIndex: 10000}}>
      jjjj
    </div>}
  </>
}


const fetchData = async () => {
  const content = document.getElementById("page-content")
  content.style.display = "none"

  return {

  }
}

renderComponent(<App component={Tutorial} fetchData={fetchData} />, "dynamic-tutorial")
