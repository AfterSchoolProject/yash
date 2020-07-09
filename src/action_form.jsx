import React, { useState } from 'react'

const ActionForm = (props) => {
  const initialActionFormState = { id: null, name: '', description: '', value: '' }
  const [action, setAction] = useState(initialActionFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setAction({...action, [name]: value})
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.addAction(action)
        setAction(initialActionFormState)
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={action.name}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={action.description}
        onChange={handleInputChange}
      />
      <label>Value</label>
      <input
        type="text"
        name="value"
        value={action.value}
        onChange={handleInputChange}
      />
      <button>Add Action</button>
    </form>
  )
}

export default ActionForm
