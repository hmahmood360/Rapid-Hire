const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const companyAuth = require('../../middleware/companyAuth')
const auth = require('../../middleware/auth')
const CompanyProfile = require('../../models/CompanyProfile')
const User = require('../../models/User')
const Post = require('../../models/Post')


// @route   GET api/companyProfile/me
// @desc    get current company profile
// @access  private

router.get('/me', companyAuth, async (req,res)=>{
    try{
        const companyProfile = await CompanyProfile.findOne({company: req.company.id}).populate('company',['name','avatar'])
        if(!companyProfile){
            return res.status(400).json({msg: 'No Profile found for the current Company'})
        }
        
        res.json(companyProfile)

    } catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/:edit
// @desc    Create or Update User Profile
// @access  private

router.post('/:edit', [auth,  [
    check('status','status is required').not().isEmpty(),
    check('skills', 'skills are required').not().isEmpty()
]],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {
        company,
        website, 
        location,
        about,
        industry,
        headcount,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    //Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) {profileFields.company = company}
    if(website) {profileFields.website = website}
    if (location) {profileFields.location = location}
    if (about) {profileFields.about = about}
    if (industry) {profileFields.industry = industry}
    if (headcount) {profileFields.headcount = headcount}

    //build social object
    profileFields.social ={}
    if (youtube) {profileFields.social.youtube = youtube}
    if (twitter) {profileFields.social.twitter = twitter}
    if (facebook) {profileFields.social.facebook = facebook}
    if (linkedin) {profileFields.social.linkedin = linkedin}
    if (instagram) {profileFields.social.instagram = instagram}

    try{
        let companyProfile = CompanyProfile.findOne({user: req.user.id})
        
        if(req.params.edit == 1){
            //update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
                )

            return res.json(profile)
        }
        // create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
    
})


// @route   GET api/profile
// @desc    get current user profile
// @access  public

router.get('/', async(req,res)=>{
    try {
        let profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @route   GET api/profile/user/:user_id
// @desc    get current user profile
// @access  public

router.get('/user/:user_id', async(req,res)=>{
    try {
        let profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])

        if(!profile) return res.status(400).json({msg: 'Profile not found'})
        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'}  )
        }
        res.status(500).send('Server Error')
        
    }
})


// @route   DELETE api/profile/
// @desc    delete user profile, user and posts
// @access  private

router.delete('/', auth, async(req,res)=>{

    
    try {
        //remove posts
        await Post.deleteMany({ user: req.user.id })

        //remove profile
        await Profile.findOneAndRemove({user: req.user.id})

        //remove user
        await User.findOneAndRemove({_id: req.user.id})

        res.json({msg: 'User deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})




module.exports = router