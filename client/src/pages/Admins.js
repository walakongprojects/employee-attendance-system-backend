import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Table, Button  } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const Admins = () => {
    const [list, setList] = useState([])
    const history = useHistory()

    const handleList = async () => {
        const result = await axios.get(`${API_URL}/admin`)
        setList(result.data.result)
    }

    useEffect(() => {
        handleList()
    }, [])

    return (
        <>
            <Container>
                <h1 className="mt-4 text-center">Admin List</h1>
                { list.length !== 0 ? 
                    (
                        <Row className="">
                            <Col>
                                <Table className="mt-4" striped responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map(employee => (
                                                <tr key={employee._id}>
                                                    <td>{employee.name}</td>
                                                    <td>{employee.username}</td>
                                                    <td><Button color="success" onClick={() => history.push(`/admin/${employee._id}`)}>View</Button></td>
                                                </tr>
                                            ))
                                        }
                                   </tbody>
                                </Table>
                            </Col>
                        </Row>
                    ) : 
                    (
                        <>
                            <h1>No admin list.</h1>
                        </>
                    )
                }
            </Container>
        </>
    )
}