import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Table,  } from 'react-bootstrap'
import axios from 'axios'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const Attendance = () => {
    const [attendance, setAttendance] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const handleAttendance = async () => {
            const fromDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const toDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`

            const result = await axios.get(`/attendance/${fromDate}/${toDate}`)
            setAttendance(result.data.result)
        }
        handleAttendance()
    }, [])

    const handleAttendanceOnChangeDate = async (date) => {
        const fromDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const toDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`

        const result = await axios.get(`/attendance/${fromDate}/${toDate}`)
        setAttendance(result.data.result)
    }

    const hanldeChangeDate = async (date) => {
        setDate(date)
        handleAttendanceOnChangeDate(date)
    }

    return (
        <>
            <Container>
                <DatePicker className="my-4" selected={date} onChange={(selectedDate) => hanldeChangeDate(selectedDate)} />
                <h1 className="mt-4 text-center" >{date.toDateString()}</h1>
                { attendance.length !== 0 ? 
                    (
                        <Row className="">
                            <Col>
                                <Table className="mt-4" striped responsive>
                                    <thead>
                                        <tr>
                                            <th>Employee No.</th>
                                            <th>Employee Name</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            attendance.map(employee => (
                                                <tr key={employee.attendanceId}>
                                                    <td>{employee.employeeDetails.employeeNumber}</td>
                                                    <td>{employee.employeeDetails.name}</td>
                                                    <td>{new Date(new Date(employee.timeIn).getTime() - 28800000).toLocaleTimeString()}</td>
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
                            <h1>No attendance available.</h1>
                        </>
                    )
                }
            </Container>
        </>
    )
}