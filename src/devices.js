import React from 'react'
import Actions from './actions'

const Devices = (props) => (
  <div>
    <h1>View Devices</h1>
    {
      props.devices.map((device) => (
        <div key={device.id}>
          Id: {device.id}<br />
          Name: {device.name}<br />
          Description: {device.description}<br />
          Host: {device.host}<br/>
          Port: {device.port}<br />
          Actions: <Actions device={device} deleteAction={props.deleteAction} /><br />
          <button
            onClick={() => props.editDevice(device)}
          >
            Edit
          </button>
          <button
            onClick={() => props.deleteDevice(device.id)}
          >
            Delete
          </button>
        </div>
      ))
    }
    <button onClick={() => props.addDevice()}>Add Device</button>
  </div>
)

export default Devices
