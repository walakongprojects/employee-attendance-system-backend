const router = require('express').Router()
const employeeModel = require('../model/employee')

router.get('/test', async (req, res) => {
    res.json({
        message: 'Testing routee'
    })
})

router.get('/', async (req, res) => {
    const result = await employeeModel.find()
    res.json({
        data: result
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await employeeModel.findById(id)
    res.json({
        data: result
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const result = await employeeModel.findById(id)
    const newResult = Object.assign(result, req.body)
    await newResult.save()
    res.json({
        data: newResult
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await employeeModel.findByIdAndDelete(id)
    res.json({
        data: result
    })
})

module.exports = router
