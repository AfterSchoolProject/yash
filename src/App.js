import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Cookies from 'js-cookie'
import DevicesPage from './devices_page'
import LoginPage from './login_page'
import { AuthContext } from './context/auth'
import AuthenticatedRoute from './authenticated_route'
import './App.css';

const App = () => {
  const session = Cookies.get("session")

  return ( 
    <AuthContext.Provider value={{ session }}>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <AuthenticatedRoute path="/devices" component={DevicesPage} />
          <Route render={() => <h1>404 page not found</h1>} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
