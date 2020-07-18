import React, { useState } from 'react'
import ActionForm from './action_form'
import { BACKEND_HOST } from './constants'
import axios from 'axios'

const EditDeviceForm = (props) => {
  const [device, setDevice] = useState(props.currentDevice)

  const handleInputDeviceChange = (event) => {
    const { name, value } = event.target

    setDevice({ ...device, [name]: value })
  }

  const addAction = (action) => {
    axios.post(`${BACKEND_HOST}/devices/${device.id}/actions`, action)
      .then(res => {
        props.updateDevice(device.id, {...device, actions: [...device.actions, res.data]})
      })
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          props.updateDevice(device.id, device)
        }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={device.name}
          onChange={handleInputDeviceChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={device.description}
          onChange={handleInputDeviceChange}
        />
        <label>Host</label>
        <input
          type="text"
          name="host"
          value={device.host}
          onChange={handleInputDeviceChange}
        />
        <label>Port</label>
        <input
          type="text"
          name="port"
          value={device.port}
          onChange={handleInputDeviceChange}
        />
        <button>Update device</button>
        <button
          onClick={() => props.setEditing(false)}
        >
          Cancel
        </button>
      </form>
      <ActionForm
        addAction={addAction}
      />
    </div>
  )
}

export default EditDeviceForm
