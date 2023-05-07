const express = require('express')
const connectDB = require('./config/db')
const Job = require('./models/Job')
const cors = require('cors');

const app = express()

app.use(cors({
    origin: '*'
}));

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

app.put('/api/jobs/jobstatus/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      const status = req.body.status;
      const user = req.body.user;
      console.log({status, user});
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
      console.log(job)


      Job.findOneAndUpdate(
        { _id: req.params.id, "applicants.user": user },
        { $set: { "applicants.$.approvedStatus": status } },
        { new: true }
      ).exec((err, updatedJob) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedJob);
        }
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
