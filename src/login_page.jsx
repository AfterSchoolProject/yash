import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BACKEND_HOST } from './constants'

const LoginPage = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (Cookies.get("session")) {
      setLoggedIn(true)
    }
  }, [])

  const signIn = () => {
    axios.post(`${BACKEND_HOST}/signin`, {login, password}, { withCredentials: true }).then(resp => {
      if (resp.status === 200) {
        setLoggedIn(true)
      } else {
        console.log(resp)
        setIsError(true)
      }
    }).catch(e => {
      console.log(e)
      setIsError(true)
    })
  }

  if (isLoggedIn) {
    return <Redirect to="/devices" />
  }

  return (
    <div>
      { isError && <span>username or password is incorrect</span> }
      <form
        onSubmit={(event) => {
          event.preventDefault()
          signIn()
        }}>
        <label>Login</label>
        <input
          type="username"
          value={login}
          onChange={ e => {
            setLogin(e.target.value)
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={ e => {
            setPassword(e.target.value)
          }}
        />
        <button>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginPage
