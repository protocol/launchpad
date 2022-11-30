import React from "react";
import {useContentLevel, useGoal} from "../../../services/hooks";
import {capitalize, getDataAttribute, LEVELS, parseBoolean, parseList, renderComponent} from "../../../services/util";
import {App} from "../../App";

const GoalIcon = ({section}) => {
  const getImageData = () => {
    switch (section) {
      case "pln":
        return {
          "src": "/logos/pl.png",
          "width": 25,
          "height": 25
        }
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
      case "dev-tools":
        return {
          "src": "/icons/devtools.png",
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

const GoalElement = ({section, goalId, goal, subgoalIds}) => {

  return <div style={{padding: '0px'}}>
    <div style={{display: 'flex', alignItems: 'flex-start'}}>
      <GoalIcon section={section} />
      <span style={{fontSize: '19px', marginLeft: '7px'}}><span style={{fontWeight: 'bold'}}>{section.toUpperCase()} {goalId}</span> - {goal.description}</span>
    </div>
    <ul style={{marginBottom: '0px', listStyleType: 'none'}}>
      {goal.subgoals.filter(subgoal => subgoalIds.includes(subgoal.id)).map(subgoal => <li style={{display: 'flex'}} key={subgoal.id}>
        <img src="/icons/goal.png" width={20} height={20} style={{marginTop: '3px'}} />
        <span style={{marginLeft: '5px'}}><b>{subgoal.id}</b> - {subgoal.description}</span>
      </li>)}
    </ul>
  </div>
}

const IntroPageGoals = ({section, goals}) => {
  const goalsByLevel = {}
  for(const level of LEVELS) {
    goalsByLevel[level] = {}
  }

  /* Categorize goals by level (e.g. shallow: [goal1, goal2], deep: [goal3, goal4])
    For the moment, shallow goals also apply to deep residents, so both must be shown
   */
  Object.entries(goals).forEach(entry => {
    const level = entry[1].levels && entry[1].levels.length > 0 ? entry[1].levels[0] : LEVELS[0]
    goalsByLevel[level] = {
      ...goalsByLevel[level],
      [entry[0]]: entry[1]
    }
  })

  const goalByLevelList = Object.entries(goalsByLevel).filter(goalByLevel => Object.keys(goalByLevel[1]).length > 0)

  return goalByLevelList.map((levelEntry, index) => <div style={{marginBottom: index < goalByLevelList.length - 1 ? '20px' : '0px'}}>
      {goalByLevelList.length > 1 && <div style={{fontSize: '24px', fontWeight: 'bold'}}>{capitalize(levelEntry[0])} Dive Goals</div>}
      {Object.entries(levelEntry[1]).map(entry => <GoalElement section={section} goalId={entry[0]} goal={entry[1]} subgoalIds={[]} />)}
    </div>
  )

}

const StandardPageGoals = ({section, goals, subgoalIds}) => {
  const [contentLevel, setContentLevel] = useContentLevel()

  return Object.entries(goals).filter(entry => {
    const levels = entry[1].levels
    return !levels || levels.length === 0 || levels.includes(contentLevel)
  }).map(entry => <GoalElement section={section} goalId={entry[0]} goal={entry[1]} subgoalIds={subgoalIds} />)
}

const Goal = ({section, goalIds, subgoalIds, show, showTitle, introPage}) => {
  const sectionGoals = useGoal(section, goalIds)

  if (!sectionGoals) {
    return null
  }

  if (!show) {
    return null
  }

  return <div className="learning-objectives">
    {showTitle && <div className="title">
      LEARNING OBJECTIVES {introPage}
    </div>}
    <div className="body">
      {introPage && <IntroPageGoals section={section} goals={sectionGoals} />}
      {!introPage && <StandardPageGoals section={section} goals={sectionGoals} subgoalIds={subgoalIds} />}
    </div>
  </div>
}

const fetchData = async () => {
  const goalDataAttribute = getDataAttribute('page', 'objGoals')
  const subgoalsDataAttribute = getDataAttribute('page', 'objSubgoals')
  const showDataAttribute = getDataAttribute('page', 'objShow')
  const showTitleDataAttribute = getDataAttribute('page', 'objShowTitle')
  const introPageDataAttribute = getDataAttribute('page', 'objIntroPage')


  const sectionDataAttribute = getDataAttribute('page', 'section')

  const subgoalsDataAttributeAsList = parseList(subgoalsDataAttribute)
  const goalsDataAttributeAsList = parseList(goalDataAttribute)

  return {
    goalIds: goalsDataAttributeAsList,
    subgoalIds: subgoalsDataAttributeAsList,
    section: sectionDataAttribute,
    show: showDataAttribute ? parseBoolean(showDataAttribute) : false,
    showTitle: showTitleDataAttribute ? parseBoolean(showTitleDataAttribute) : true,
    introPage: introPageDataAttribute ? parseBoolean(introPageDataAttribute) : false
  }
}

renderComponent(<App component={Goal} fetchData={fetchData} />, "goal")
