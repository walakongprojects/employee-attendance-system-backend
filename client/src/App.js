// Packages
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// Pages
import { Attendance } from './pages/Attendance'
import { CreateAdmin } from './pages/CreateAdmin'
import { Admins } from './pages/Admins'
import { Admin } from './pages/Admin'
import { Login } from './pages/Login'

// Contexts
import { AuthContext } from './contexts/authContext'

// Components
import { Header } from './components/layout/Header'

import './App.css';
import { useEffect, useState } from 'react'
import { PrivateRoute } from './components/PrivateRoute'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import axios from 'axios'
import rootReducers from './reducers'

const store = createStore(rootReducers)

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function App() {

  useEffect(() => {

    // if(adminInfo.isAuthenticated) {
    //   dispat
    // }
    // const getAdminDetails = async () => {
    //   const result = await axios.get(`${API_URL}/current`)
    //   if(result.data.id) {
    //     setAuth({ isAuthenticated: true, user: { id: result.data.id, name: result.data.name, level: result.data.level }})
    //   }
    // }

    // if(!localStorage.getItem('jwtToken')) {
    // } else {
    //   getAdminDetails()
    // }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-admin" component={CreateAdmin} />
          <Route exact path="/admin-list" component={Admins} />
          <Route exact path="/admin/:_id" component={Admin} />
          <Switch>
            <PrivateRoute exact path="/attendance" component={Attendance} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
