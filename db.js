const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/emp-attendance-dev'

console.log(MONGO_URI, 'node env')

module.exports = () => {
    mongoose.connect(MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true, useNewUrlParser: true })
        .then(() => console.log('Connected to database.'))
        .catch(err => console.log(`Error on connecting to database: ${err}`))
}
