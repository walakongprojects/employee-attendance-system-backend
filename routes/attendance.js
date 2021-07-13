const router = require('express').Router()
const employeeModel = require('../model/employee')
const attendanceModel = require('../model/attendance')

router.get('/test', async (req, res) => {
    res.json({
        message: 'Testing routee'
    })
})

router.get('/', async (req, res) => {
    const result = await attendanceModel.find()
    res.json({
        data: result
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await attendanceModel.findById(id)
    res.json({
        data: result
    })
})

router.get('/:_from/:_to', async(req, res) => {
    let { _from, _to } = req.params
    _from = _from.replace('-', ',')
    _to = _to.replace('-', ',')
    const MILLISECONDS_PER_DAY = 86400000
    // const offset = 0
    const offset = 36000000
    const MILLISECONDS_PER_HOUR = 3600000
    const dateFrom = new Date((new Date(_from).getTime() + MILLISECONDS_PER_DAY) - ((new Date(_from).getTimezoneOffset() / 60) * MILLISECONDS_PER_HOUR))
    const dateTo = new Date((new Date(_to).getTime() + MILLISECONDS_PER_DAY) - ((new Date(_from).getTimezoneOffset() / 60) * MILLISECONDS_PER_HOUR))
    console.log(dateFrom, 'dateFrom')
    console.log(dateTo, 'tooooo')

    const pipeline = [
        {
            $match: {
                timeIn: {
                    $gte: dateFrom,
                    $lt: dateTo
                }
            }
        },
        {
            $lookup: {
                from: 'employees',
                localField: 'employeeName',
                foreignField: 'name',
                as: 'employeeDetails'
            }
        },
        {
            $unwind: {
                path: '$employeeDetails',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$employeeName',
                attendanceId: {
                    $first: '$_id'
                },
                employeeName: {
                    $first: '$employeeName'
                },
                timeIn: {
                    $first: '$timeIn'
                },
                employeeDetails: {
                    $first: '$employeeDetails'
                }
            }
        }
    ]

    const result = await attendanceModel.aggregate(pipeline)
    res.json({
        result
    })
})

module.exports = router
