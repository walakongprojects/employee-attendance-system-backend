const { Schema, model } = require('mongoose')

const attendanceSchema = new Schema({
    employeeeName: {
        type: String
    },
    timeIn: {
        type: Date,
        default: Date.now()
    }
}, {
    autoCreate: true,
    timestamps: true
})

module.exports = model('Attendance', attendanceSchema)