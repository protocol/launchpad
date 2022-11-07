import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "../../App";
import {useProgress} from "../../../services/hooks";

const SidebarMenuIcon = ({weight}) => {

  const [progress, setProgress] = useProgress(weight)

  if (!progress) {
    return <span>No</span>
  }

  return <span>Sí</span>
}

/*const containers = document.querySelectorAll("[id^='sidebarmenuicon-']")
let containerId = null
//console.log(containers)
for(const container of containers) {
  const renderedAttribute = container.dataset['rendered']
  console.log(container.id + " " + container.dataset['rendered'])
  if (!renderedAttribute) {
    containerId = container.id
    container.dataset.rendered = "true"
    console.log('found ' + containerId)
    break
  }
}

console.log('got ' + containerId)
*/

const selectedContainers = document.querySelectorAll('[data-render-id^="sidebarmenuicon"]');
for (const container of selectedContainers) {

  const fetchData = async () => {
    const weight = container.parentNode.dataset.pageWeight

    return {
      weight: weight
    }
  }

  const root = ReactDOM.createRoot(container);
  root.render(<App component={SidebarMenuIcon} fetchData={fetchData} />)
}

