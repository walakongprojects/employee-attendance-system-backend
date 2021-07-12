import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert, Container, Card } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  username: yup.string().required().min(6),
  password: yup.string().required().min(6),
  confirmPassword: yup.string().test('password-match', 'Password does not match', function(value) {
    const { password } = this.parent
    return password === value
  }).required(),
});

export const Admin = () => {
    const history = useHistory()
    const { _id } = useParams()
    const [data, setData] = useState(null)
    const [edit, setEdit] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorText, setErrorText] = useState('')

    const getAdmin = async () => {
        const result = await axios.get(`/admin/${_id}`)
        setData(result.data.result)
    }

    useEffect(() => {
        getAdmin()
    }, [])

  return (
    <>
        <Row className="my-4 justify-content-center">
            <Col >
                <Button variant="primary" className="mr-4" onClick={() => history.push('/admin-list')} >Back</Button>
                <Button variant="warning" onClick={() => setEdit(!edit)} >{!edit ? 'Edit' : 'Cancel'}</Button>
            </Col>
        </Row>
      {
          data ? (
            <>
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
          <Container >
      <Row className="justify-content-center">
          <Col></Col>
          <Col xs={10} md={8}  as={Row} className="justify-content-center">
          <Col></Col>
          <Col md={10}>
          <Card  bg='secondary' text='light'  className="justify-content-center mt-5">
              <Card.Header className="text-center">Create Admin</Card.Header>
              <Card.Body>

                <Formik
                    validationSchema={schema}
                    onSubmit={async (values) => {
                        const result = await axios.put(`/admin/${_id}`, {
                            name: values.firstName,
                            username: values.username,
                            password: values.password,
                        })
                        console.log(result.data, 'result')
                        if(!result.data.hasError) {
                            // setData(result.data.result)
                            console.log('aaaaaa')
                            history.push('/admin-list')
                        } else {
                            setErrorText(result.data.message)
                            setHasError(!hasError)
                        }
                    }}
                    initialValues={{
                        firstName: data.name,
                        username: data.username,
                        password: '',
                        confirmPassword: '',
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
                        <Row className="mb-3">
                        <Form.Group as={Col} md="4" lg="12" controlId="validationFormik01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                                isValid={touched.firstName && !errors.firstName}
                                disabled={!edit}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} md="4" lg="12"controlId="validationFormik02">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                                isValid={touched.username && !errors.username}
                                disabled={!edit}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} md="4" lg="12"controlId="validationFormik03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                isValid={touched.password && !errors.password}
                                disabled={!edit}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} md="4" lg="12"controlId="validationFormik04">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                                isValid={touched.confirmPassword && !errors.confirmPassword}
                                disabled={!edit}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Button type="submit" disabled={!edit} variant="primary">Update</Button>
                    </Form>
                    )}
                </Formik>
                </Card.Body>
                </Card>
                </Col>
                <Col></Col>
                </Col>
                <Col></Col>
            </Row>
      </Container>

            </>
            ) :
          (
              <h1>Loading Data...</h1>
          )
      }
    </>
  );
} 

