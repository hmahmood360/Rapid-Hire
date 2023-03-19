const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB() 

//Init middleware
app.use(express.json({extended: false}))


app.get('/', (req, res)=> res.send('API Running'))

//Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/company', require('./routes/api/company'))
app.use('/api/companyAuth', require('./routes/api/companyAuth'))
app.use('/api/companyProfile', require('./routes/api/companyProfile'))
app.use('/api/jobs', require('./routes/api/jobs'))
app.use('/api/admin', require('./routes/api/admin'))
app.use('/api/spam', require('./routes/api/spam'))




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
