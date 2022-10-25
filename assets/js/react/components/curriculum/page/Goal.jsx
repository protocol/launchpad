import React from "react";
import {useGoal} from "../../../services/hooks";
import {getDataAttribute, renderComponent} from "../../../services/util";
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

const Goal = ({section, goalId, subgoalIds}) => {
  const goal = useGoal(section, goalId)

  if (!goal) {
    return null
  }

  return <div className="learning-objectives">
    <div className="title">
      LEARNING OBJECTIVES
    </div>
    <div className="body">
      <div style={{padding: '6px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <GoalIcon section={section} />
          <span style={{fontSize: '19px', fontWeight: 'bold', marginLeft: '7px'}}>{section.toUpperCase()} {goalId} - {goal.description}</span>
        </div>
        <ul style={{marginBottom: '0px', listStyleType: 'none'}}>
          {goal.subgoals.filter(subgoal => subgoalIds.includes(subgoal.id)).map(subgoal => <li style={{display: 'flex'}} key={subgoal.id}>
            <img src="/icons/goal.png" width={20} height={20} style={{marginTop: '3px'}} />
            <span style={{marginLeft: '5px'}}><b>{subgoal.id}</b> - {subgoal.description}</span>
          </li>)}
        </ul>
      </div>
    </div>
  </div>
}

const fetchData = async () => {
  const goalDataAttribute = getDataAttribute('page', 'goal')
  const subgoalsDataAttribute = getDataAttribute('page', 'subgoals')
  const sectionDataAttribute = getDataAttribute('page', 'section')

  const subgoalsToList = subgoals => {
    return subgoals.replace('[', '').replace(']', '').split(' ')
  }

  const subgoalsDataAttributeAsList = subgoalsToList(subgoalsDataAttribute)

  return {
    goalId: goalDataAttribute,
    subgoalIds: subgoalsDataAttributeAsList,
    section: sectionDataAttribute
  }
}

renderComponent(<App component={Goal} fetchData={fetchData} />, "goal")
