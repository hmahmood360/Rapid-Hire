require("dotenv").config();

const express = require('express')
const connectDB = require('./config/db')
const Job = require('./models/Job')
const cors = require('cors');
const morgan = require("morgan");


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

// videoSDK documentation

app.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "100m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

//
app.post("/create-meeting/", (req, res) => {
  const { token, region } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
