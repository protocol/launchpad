import ReactDOM from "react-dom/client";
import React from "react";
import * as params from '@params';
import {useGoal} from "../../../services/hooks";

const Goal = ({section, goalId, subgoalIds}) => {

  const goal = useGoal(section, goalId)

  return <div>
    <div style={{fontSize: '15px', fontWeight: 'bold'}}>LEARNING OBJECTIVES</div>
    <div style={{backgroundColor: '#f6f6f6', border: '1px solid #EAEAEAFF', borderRadius: '8px 8px 8px 8px'}}>
      <div style={{padding: '6px'}}>
        <span style={{fontSize: '19px', fontWeight: 'bold'}}>IPFS 1.6 - Do something la la la</span>
        <ul>
          <li>1.61 dsdsdsd</li>
          <li>1.62 dsdsdsd</li>
        </ul>
      </div>
    </div>
  </div>
}

const container = document.getElementById('goal1');
const root = ReactDOM.createRoot(container);
root.render(<Goal goalId={params.goal} subgoalIds={params.subgoals} />)
