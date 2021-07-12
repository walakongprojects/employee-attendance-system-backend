const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 0
    }
}, {
    autoCreate: true,
    timestamps: true
})

module.exports = model('Admin', adminSchema)