import React from 'react'

const Actions = (props) => (
  props.device.actions.map((action) => (
    <div key={`${props.device.id}-${action.id}`}>
        Id: {action.id}<br />
        Name: {action.name}<br />
        Description: {action.description}<br />
        Value: {action.value}<br/>
    </div>
  ))
)

export default Actions
