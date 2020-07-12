import React from 'react'
import axios from 'axios'

const Actions = (props) => {
  const activateAction = (device_id, action_id) => {
    axios.post(`http://localhost:8080/devices/${device_id}/actions/${action_id}`)
      .then(res => {
        console.log("Message Sent")
      })
  }

  return (props.device.actions.map((action) => (
    <div key={`${props.device.id}-${action.id}`}>
      Id: {action.id}<br />
      Name: {action.name}<br />
      Description: {action.description}<br />
      Value: {action.value}<br/>
      <button
        onClick={() => activateAction(props.device.id, action.id)}
      >
        Send
      </button>
    </div>
  ))
  )
}

export default Actions
