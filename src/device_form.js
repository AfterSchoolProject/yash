import React, { useState } from 'react'

const DeviceForm = (props) => {
  const initialFormState = { id: null, name: '', description: '', host: '', port: '' }

  const [device, setDevice] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setDevice({...device, [name]: value})
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.addDevice(device)
        setDevice(initialFormState)
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={device.name}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={device.description}
        onChange={handleInputChange}
      />
      <label>Host</label>
      <input
        type="text"
        name="host"
        value={device.host}
        onChange={handleInputChange}
      />
      <label>Port</label>
      <input
        type="text"
        name="port"
        value={device.port}
        onChange={handleInputChange}
      />

      <button>Add device</button>
    </form>
  )
}

export default DeviceForm
