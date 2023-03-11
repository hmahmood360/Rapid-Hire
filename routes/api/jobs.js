const express = require('express');
const router = express.Router();
const Job = require('../../models/Job');
const companyAuth = require('../../middleware/companyAuth')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')


// @route   POST api/jobs
// @desc    Post a new job
// @access  Private

router.post('/',[companyAuth, [
    check('title','Enter Job title').not().isEmpty(),
    check('description','Enter Job description').not().isEmpty(),
    check('requiredSkills','Enter required Skills to post job').not().isEmpty(),
    check('requiredSkills','Enter required Skills to post job').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
  try {
    const {
      company,
      title,
      location,
      description,
      type,
      gender,
      qualification,
      requiredSkills,
      salaryFrom,
      salaryTo,
      positions
    } = req.body;

    const newJob = new Job({
      company,
      title,
      location,
      description,
      type,
      gender,
      qualification,
      requiredSkills,
      salaryFrom,
      salaryTo,
      positions
    });
    newJob.company= req.company.id

    const savedJob = await newJob.save();

    res.json(savedJob);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT api/jobs/:job_id
// @desc    Edit an existing job
// @access  Private
router.put('/:id', companyAuth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      // Check if the user owns the job post
      if (job.company.toString() !== req.company.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      job.title = req.body.title || job.title;
      job.location = req.body.location || job.location;
      job.description = req.body.description || job.description;
      job.type = req.body.type || job.type;
      job.gender = req.body.gender || job.gender;
      job.qualification = req.body.qualification || job.qualification;
      job.requiredSkills = req.body.requiredSkills || job.requiredSkills;
      job.salaryFrom = req.body.salaryFrom || job.salaryFrom;
      job.salaryTo = req.body.salaryTo || job.salaryTo;
      job.positions = req.body.positions || job.positions;
  
      const updatedJob = await job.save();
  
      res.json(updatedJob);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   GET api/jobs/:id
// @desc    get single job
// @access  public

router.get('/job/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate('company', ['name', 'avatar'])
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.json(job)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.status(500).send('Server Error')
    }
  })


// @route   GET api/jobs/
// @desc    get all job
// @access  public
router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find().populate('company', ['name', 'logo'])
      res.json(jobs)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


// @route   Delete api/jobs/:id
// @desc    delete a job
// @access  private

router.delete('/:id',companyAuth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
      // Check if the user deleting the job is the same user who posted it
      if (job.company._id.toString() !== req.company.id) {
        return res.status(401).json({ msg: 'You are not authorized to delete this job' })
      }
      await job.remove()
      res.json({ msg: 'Job deleted' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.status(500).send('Server Error')
    }
  })


// @route   POST api/apply/:id
// @desc    User can apply for a job
// @access  private

router.post('/apply/:id', auth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
  
      // Check if user has already applied for this job
      if (job.applicants.find(applicant => applicant.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'You have already applied for this job' })
      }
  
      const applicant = {
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
      }
  
      job.applicants.unshift(applicant)
  
      await job.save()
  
      res.json(job.applicants)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


// @route   DELETE api/apply/:id
// @desc    User can delete application for job
// @access  private

router.delete('/apply/:id', auth, async (req, res) => {
    try {
      // Find the job document that has an applicant with the same user_id as the currently authenticated user
      const job = await Job.findOne({ 'applicants.user': req.user.id })
  
      // If the job document is not found, return a 404 error response with a JSON object containing an error message
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
  
      // Find the index of the user's application in the applicants array
      const removeIndex = job.applicants.map(applicant => applicant.user.toString()).indexOf(req.user.id)
  
      // If the user has not applied for this job, return a 404 error response with a JSON object containing an error message
      if (removeIndex === -1) {
        return res.status(404).json({ msg: 'Application not found' })
      }
  
      // Remove the user's application from the applicants array
      job.applicants.splice(removeIndex, 1)
  
      // Save the modified job document
      await job.save()
  
      // Return a JSON object containing the updated applicants array
      res.json(job.applicants)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })
  

module.exports = router;
