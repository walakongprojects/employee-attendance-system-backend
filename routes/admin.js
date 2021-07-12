const router = require('express').Router()
const adminModel = require('../model/admin')
const argon2 = require('argon2')

router.get('/test', async (req, res) => {
    res.json({
        message: 'Testing routee'
    })
})

router.get('/', async (req, res) => {
    const result = await adminModel.find()
    res.json({
        result
    })
})

router.post('/', async (req, res) => {
    const { name, username, password } = req.body
    try {
        const hashedPassword = await argon2.hash(password)
        const result = await adminModel.create({
            name,
            username,
            password: hashedPassword
        })
        res.json({
            result,
            hasError: false
        })
    } catch {
        return res.json({
            message: 'Fail to create user',
            hasError: true
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await adminModel.findById(id).select(['-password', '-level'])
    res.json({
        result
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, username, password } = req.body

    try {
        const result = await adminModel.findById(id)

        if(!result) {
            res.json({
                message: 'User not found',
                hasError: true
            })
        }

        const isEqual = await argon2.verify(result.password, password)

        if(!isEqual) {
            res.json({
                message: 'Password does not match.',
                hasError: true
            })
        }

        const hashedPassword = await argon2.hash(password)

        result.name = name
        result.username = username
        result.password = hashedPassword

        await result.save()

        res.json({
            result,
            message: 'Admin successfully updated.',
            hasError: false
        })

    } catch {
        res.json({
            message: 'Something went wrong in the server.',
            hasError: true
        })
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await adminModel.findByIdAndDelete(id)
    res.json({
        message: 'Admin deleted'
    })
})

module.exports = router
