const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')

// routes
const employeeRoutes = require('./routes/employee')
const attendanceRoutes = require('./routes/attendance')
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const db = require('./db')

dotenv.config()

const PORT = process.env.PORT || '5000'

// db()
// mongoose.connect(MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true, useNewUrlParser: true })
//     .then(() => console.log('Connected to database.'))
//     .catch(err => console.log(`Error on connecting to database: ${err}`))
db()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(cors())


app.get('/test', (req, res) => {
    res.send('Testing route')
})

app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/employee', employeeRoutes)
app.use('/attendance', attendanceRoutes)
app.use('/admin', adminRoutes)
app.use('/', authRoutes)

// process.env['NODE_ENV'] = 'development';
// Server static assets if in production
console.log(process.env.NODE_ENV, 'node env')
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}``

app.listen(PORT,() => {
    console.log(`Server is running in PORT ${PORT}`)
})