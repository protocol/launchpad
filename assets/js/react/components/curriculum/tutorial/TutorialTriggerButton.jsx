import React from "react";

export const TutorialTriggerButton = ({title, active}) => {

  const className = active ? "docs-link rounded active" : "docs-link rounded"

  return <div style={{display: 'flex',  marginTop: '4px', alignItems: 'center'}}>
    <img src="/icons/tutorial.png" width="20" height="20" />
    <div className={className} style={{marginLeft: '6px', cursor: 'pointer'}}> {title}</div>
  </div>
}
