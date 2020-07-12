import React, { useState, useEffect } from 'react';
import Devices from './devices'
import DeviceForm from './device_form'
import EditDeviceForm from './edit_device_form'
import axios from 'axios'
import './App.css';

const App = () => {
  const devicesData = []
  const initialFormState = {
    id: null,
    name: '',
    description: '',
    host: '',
    port: '',
    actions: []
  }

  const [devices, setDevices] = useState(devicesData)
  const [editing, setEditing] = useState(false)
  const [currentDevice, setCurrentDevice] = useState(initialFormState)

  useEffect(() => {
    axios.get('http://localhost:8080/devices')
      .then(res => {
        const devices = res.data
        setDevices(devices)
      })
  }, [])

  const addDevice = (device) => {
    axios.post('http://localhost:8080/devices', device)
      .then(res => {
        console.log(res)
        setDevices([...devices, res.data])
      })
  }

  const editDevice = (device) => {
    setEditing(true)

    setCurrentDevice({
      id: device.id,
      name: device.name,
      description: device.description,
      host: device.host,
      port: device.port,
      actions: device.actions
    })
  }

  const updateDevice = (id, updatedDevice) => {
    setEditing(false)

    axios.put(`http://localhost:8080/devices/${id}`, updatedDevice)
      .then(res => {
        console.log(res)
        setDevices(devices.map((device) => (device.id === id ? updatedDevice : device)))
      })
  }

  const deleteDevice = (id) => {
    axios.delete(`http://localhost:8080/devices/${id}`)
      .then(res => {
        console.log(res)
        setDevices(devices.filter((device) => device.id !== id))
      })
  }

  return ( 
    <div className="container">
      <h1>Devices</h1>
      <div className="flew-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit Device</h2>
              <EditDeviceForm
                setEditing={setEditing}
                currentDevice={currentDevice}
                updateDevice={updateDevice}
              />
            </div>
          ) : (
            <div>
              <h2>Add Devices</h2>
              <DeviceForm addDevice={addDevice} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Devices</h2>
          <Devices
            devices={devices}
            editDevice={editDevice}
            deleteDevice={deleteDevice}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
