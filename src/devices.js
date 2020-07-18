import React from 'react'
import Actions from './actions'

const Devices = (props) => (
  <div>
    {
      props.devices.map((device) => (
        <div key={device.id}>
            Id: {device.id}<br />
            Name: {device.name}<br />
            Description: {device.description}<br />
            Host: {device.host}<br/>
            Port: {device.port}<br />
            Actions: <Actions device={device} /><br />
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
  </div>
)

export default Devices
