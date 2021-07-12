const router = require('express').Router()
const adminModel = require('../model/admin')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/test', async (req, res) => {
    res.json({
        message: 'Testing routee'
    })
})

router.post('/login', async (req, res) => {
    console.log('login')
    console.log(req.body)
    const { username, password } = req.body

    const result = await adminModel.findOne({ username })

    if(!result) {
        res.json({
            message: 'User not found.',
            hasError: true
        })
    }

    const isEqual = await argon2.verify(result.password, password)

    if(!isEqual) {
        res.json({
            message: 'Wrong credentials.',
            hasError: true
        })
    }

    const payload = { id: result._id, name: result.name, level: result.level }

    jwt.sign(
        payload,
        'my secret',
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            token: 'Bearer ' + token,
            success: true,
            hasError: false
          });
        }
    )
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        level: req.user.level,
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
            data: result
        })
    } catch {
        return res.json({
            message: 'Fail to create user'
        })
    }
})

module.exports = router
