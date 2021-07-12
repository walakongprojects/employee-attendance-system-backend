import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import setAuthToken from '../../utils/setAuthToken'
import { useAuth } from '../../contexts/authContext'
import axios from 'axios'
import { SET_CURRENT_USER } from '../../actions/types'
import jwtDecode from 'jwt-decode'
import logo from './logo-armscor-large.webp'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const Header = () => {
    const adminInfo = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const {auth, setAuth} = useAuth()
    const [showLogin, setShowLogin] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken')
        if(token) {
            const decoded = jwtDecode(token)
            dispatch({
                type: SET_CURRENT_USER,
                payload: {
                    isAuthenticated: true,
                    user: decoded
                }
            })
            history.push('/attendance')
        } else {
            history.push('/login')
        }
        // const getCurrent = async () => {
        //     const result = await axios.get(`${API_URL}/current`)
        //     if(result.data.id) {
        //         setAuth({ isAuthenticated: true, user: { id: result.data.id, name: result.data.name, level: result.data.level }})
        //         history.push('/attendance')
        //     }     
        // }

        // if(token) {
        //     getCurrent()
        // } else {
        //     console.log(2)
        //     setShowLogin(false)
        // } 
    }, [])


    const handleShowLogin = () => {
        setShowLogin(!showLogin)
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken')
        setAuthToken(false)
        dispatch({
            type: SET_CURRENT_USER,
            payload: {
                isAuthenticated: false,
                user: {}
            }
        })
        history.push('/login')
    }

    return (
        <Navbar bg="secondary" expand="lg" variant='light' color='light'>
          <Navbar.Brand>
              <Link to="/attendance">
              <img
                src={logo}
                width="140"
                height="50"
                className="d-inline-block align-top"
                alt="Employee Attendance logo"
            />              
            </Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
                {
                    adminInfo.isAuthenticated ? 
                    (
                        <>
                            <Nav.Item className="mr-4">
                                <Link to='/attendance'  style={{color: 'white'}}>
                                    Attendance
                                </Link>
                            </Nav.Item>
                            <Nav.Item className="mr-4" >
                                <Link to='/admin-list' style={{color: 'white'}}>
                                    Admin List
                                </Link>
                            </Nav.Item>
                            <Nav.Item className="mr-4">
                                <Link to='/create-admin' style={{color: 'white'}}>
                                    Create Admin
                                </Link>
                            </Nav.Item>
                            <Nav.Item className="mr-4">
                                <Button onClick={handleLogout} variant='sm'  style={{color: 'white'}} >
                                    Logout
                                </Button>
                            </Nav.Item>
                       </>
                    ) :
                    (
                        <Nav.Link href="/login" >Login</Nav.Link>
                    )
                }
           </Nav>
          </Navbar.Collapse>
      </Navbar>    
    )
}