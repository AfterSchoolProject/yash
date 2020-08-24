import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          Cookies.get("session") ?
            <Component {...props} />
            :
            <Redirect to="/" />
        )
      }}
    />
  )
}

export default AuthenticatedRoute
