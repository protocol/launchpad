import React from "react";
import {useContentLevel, useGoal} from "../../../services/hooks";
import {getDataAttribute, parseBoolean, parseList, renderComponent} from "../../../services/util";
import {App} from "../../App";

const GoalIcon = ({section}) => {
  const getImageData = () => {
    switch (section) {
      case "ipfs":
        return {
          "src": "/logos/ipfs.svg",
          "width": 25,
          "height": 25
        }
      case "ipld":
        return {
          "src": "/logos/ipld.png",
          "width": 25,
          "height": 28
        }
      case "libp2p":
        return {
          "src": "/logos/libp2p.png",
          "width": 25,
          "height": 29
        }
      case "filecoin":
        return {
          "src": "/logos/filecoin.png",
          "width": 25,
          "height": 25
        }
      default:
        return {
          "src": "/icons/goal.png",
          "width": 25,
          "height": 25
        }
    }
  }

  const imageData = getImageData()

  return <img src={imageData.src} width={imageData.width} height={imageData.height} />
}

const Goal = ({section, goalIds, subgoalIds, show, showTitle}) => {
  const sectionGoals = useGoal(section, goalIds)
  const [contentLevel, setContentLevel] = useContentLevel()

  if (!sectionGoals) {
    return null
  }

  if (!show) {
    return null
  }

  console.log(showTitle)

  return <div className="learning-objectives">
    {showTitle && <div className="title">
      LEARNING OBJECTIVES
    </div>}
    <div className="body">
      {Object.entries(sectionGoals).filter(entry => {
        const levels = entry[1].levels
        return !levels || levels.length === 0 || levels.includes(contentLevel)
      }).map(entry => {
        console.log(entry)
        const goal = entry[1]
        return <div style={{padding: '0px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <GoalIcon section={section} />
            <span style={{fontSize: '19px', fontWeight: 'bold', marginLeft: '7px'}}><span style={{color: '#006e14'}}>{section.toUpperCase()} {entry[0]}</span> - {goal.description}</span>
          </div>
          <ul style={{marginBottom: '0px', listStyleType: 'none'}}>
            {goal.subgoals.filter(subgoal => subgoalIds.includes(subgoal.id)).map(subgoal => <li style={{display: 'flex'}} key={subgoal.id}>
              <img src="/icons/goal.png" width={20} height={20} style={{marginTop: '3px'}} />
              <span style={{marginLeft: '5px'}}><b>{subgoal.id}</b> - {subgoal.description}</span>
            </li>)}
          </ul>
        </div>})}
    </div>
  </div>
}

const fetchData = async () => {
  const goalDataAttribute = getDataAttribute('page', 'objGoals')
  const subgoalsDataAttribute = getDataAttribute('page', 'objSubgoals')
  const showDataAttribute = getDataAttribute('page', 'objShow')
  const showTitleDataAttribute = getDataAttribute('page', 'objShowTitle')

  const sectionDataAttribute = getDataAttribute('page', 'section')

  const subgoalsDataAttributeAsList = parseList(subgoalsDataAttribute)
  const goalsDataAttributeAsList = parseList(goalDataAttribute)

  return {
    goalIds: goalsDataAttributeAsList,
    subgoalIds: subgoalsDataAttributeAsList,
    section: sectionDataAttribute,
    show: showDataAttribute ? parseBoolean(showDataAttribute) : false,
    showTitle: showTitleDataAttribute ? parseBoolean(showTitleDataAttribute) : true
  }
}

renderComponent(<App component={Goal} fetchData={fetchData} />, "goal")
