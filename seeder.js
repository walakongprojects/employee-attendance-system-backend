const db = require('./db')
const adminModel = require('./model/admin')
const argon2 = require('argon2')

const seed = async () => {
    db()

    const adminDoc = await adminModel.findOne({ username: 'adminOne' })
    if(!adminDoc) {
        const newAdmin = await adminModel.create({
            username: 'adminOne',
            name: 'John Doe',
            password: await argon2.hash('adminadmin')
        })
        console.log('Admin is created')
        return
    }
    console.log('Admin already exist.')
}

seed()

