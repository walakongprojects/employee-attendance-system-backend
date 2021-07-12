import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert, Container, Card } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_USER } from '../actions/types';
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const schema = yup.object().shape({
  username: yup.string().required().min(6),
  password: yup.string().required().min(6),
});

export const Login = () => {
    const adminInfo = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const [hasError, setHasError] = useState(false)
    const [errorText, setErrorText] = useState('')

    const getCurrent = async () => {
        if(adminInfo.isAuthenticated) {
            history.push('/attendance')
        } else {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {
                    isAuthenticated: false,
                    user: {}
                }
            })
            history.push('/login')
        }
    }

    useEffect(() => {
        getCurrent()
    }, [dispatch])

  return (
    <>
        <Container >
        {
            hasError ? (
                <Row className="mb-4">
                    <Col className="justify-content-center">
                        <Alert variant='danger'>
                            {errorText}
                        </Alert>
                    </Col>
                </Row>
            ) : null
        }
        <Row className="justify-content-center">
            <Col></Col>
            <Col xs={10} md={8}  as={Row} className="justify-content-center">
            <Card border="primary" className="justify-content-center mt-5">
                <Card.Header className="text-center">Login</Card.Header>
                <Card.Body>
                    <Formik
                    validationSchema={schema}
                    onSubmit={async (values) => {
                        const result = await axios.post(`${API_URL}/login`, {
                            username: values.username,
                            password: values.password
                        })
                        if(!result.data.hasError) {
                            const decoded = jwtDecode(result.data.token)
                            dispatch({
                                type: SET_CURRENT_USER,
                                payload: {
                                    isAuthenticated: true,
                                    user: decoded
                                }
                            })
                            setAuthToken(result.data.token)
                            localStorage.setItem('jwtToken', result.data.token);
                            history.push('/attendance')
                        } else {
                            dispatch({
                                type: SET_CURRENT_USER,
                                payload: {
                                    isAuthenticated: false,
                                    user: {}
                                }
                            })
                            setErrorText(result.data.message)
                            setHasError(!hasError)
                        }
                    }}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                >
                    {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3 " >
                        <Form.Group as={Col} md="12" controlId="validationFormik02" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                style={{'width': '100%'}}
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                                isValid={touched.username && !errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationFormik03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                isValid={touched.password && !errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Button type="submit" block >Login</Button>
                    </Form>
                    )}
                </Formik>
                </Card.Body>
                </Card>
                </Col>
                <Col></Col>
            </Row>
            </Container>
        </>
  );
} 

