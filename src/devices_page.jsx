import React, { useState, useEffect }from 'react'
import { BACKEND_HOST } from './constants'
import Devices from './devices'
import EditDeviceForm from './edit_device_form'
import DeviceForm from './device_form.js'
import axios from 'axios'

const DevicesPage = () => {
  var deviceView
  const initialFormState = {
    id: null,
    name: '',
    description: '',
    host: '',
    port: '',
    actions: []
  }

  const [devices, setDevices] = useState([])
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [currentDevice, setCurrentDevice] = useState(initialFormState)

  useEffect(() => {
    axios.get(`${BACKEND_HOST}/devices`, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          const devices = res.data
          setDevices(devices)
        } else {
          console.log(res)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const addDevice = (device) => {
    setAdding(false)

    axios.post(`${BACKEND_HOST}/devices`, device, { withCredentials: true })
      .then(res => {
        console.log(res)
        setDevices([...devices, res.data])
      })
  }

  const updateDevice = (id, updatedDevice) => {
    setEditing(false)

    axios.put(`${BACKEND_HOST}/devices/${id}`, updatedDevice, { withCredentials: true })
      .then(res => {
        console.log(res)
        setDevices(devices.map((device) => (device.id === id ? updatedDevice : device)))
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

  const deleteDevice = (id) => {
    axios.delete(`${BACKEND_HOST}/devices/${id}`, { withCredentials: true })
      .then(res => {
        console.log(res)
        setDevices(devices.filter((device) => device.id !== id))
      })
  }

  const deleteAction = (device_id, action_id) => {
    axios.delete(`${BACKEND_HOST}/devices/${device_id}/actions/${action_id}`, { withCredentials: true })
      .then(res => {
        console.log(`Action ${action_id} for Device ${device_id} DELETED`)
        axios.get(`${BACKEND_HOST}/devices/${device_id}`, { withCredentials: true })
          .then(res => {
            let updated_devices = devices.map((device,) => (
              device.id === device_id ? res.data : device
            ))
            setDevices(updated_devices)
          })
      })
  }

  if (editing) {
      deviceView = <EditDeviceForm
        setEditing={setEditing}
        currentDevice={currentDevice}
        updateDevice={updateDevice}
      />
  } else if (adding) {
      deviceView = <DeviceForm addDevice={addDevice} />
  } else {
      deviceView = <Devices
        devices={devices}
        editDevice={editDevice}
        deleteDevice={deleteDevice}
        addDevice={() => setAdding(true)}
        deleteAction={deleteAction}
      />
  }

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large">
          { deviceView }
        </div>
      </div>
    </div>
  )
}

export default DevicesPage
