const { Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    employeeNumber: {
        type: String,
        required: true
    }
}, {
    autoCreate: true,
    timestamps: true
})

module.exports = model('Employee', employeeSchema)