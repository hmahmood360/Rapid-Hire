const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const companyAuth = require('../../middleware/companyAuth')
const CompanyProfile = require('../../models/CompanyProfile')


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

// @route   POST api/companyProfile/:edit
// @desc    Create or Update Company Profile
// @access  private

router.post('/:edit', [companyAuth,  [
    check('location','location is required').not().isEmpty(),
    check('industry', 'industry niche is required').not().isEmpty()
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
    profileFields.company = req.company.id
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
        let companyProfile = CompanyProfile.findOne({company: req.company.id})
        
        if(req.params.edit == 1){
            //update
            companyProfile = await CompanyProfile.findOneAndUpdate(
                {company: req.company.id},
                {$set: profileFields},
                {new: true}
                )

            return res.json(companyProfile)
        }
        // create
        companyProfile = new CompanyProfile(profileFields)
        await companyProfile.save()
        res.json(companyProfile)

    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
    
})


// @route   GET api/profile
// @desc    get all companies profiles
// @access  public

router.get('/', async(req,res)=>{
    try {
        let companyProfiles = await CompanyProfile.find().populate('company',['name','avatar'])
        res.json(companyProfiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @route   GET api/profile/user/:user_id
// @desc    get single company profile
// @access  public

router.get('/company/:company_id', async(req,res)=>{
    try {
        let companyProfile = await CompanyProfile.findOne({company:req.params.company_id}).populate('company',['name','avatar'])

        if(!companyProfile) return res.status(400).json({msg: 'No company profile found'})
        res.json(companyProfile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'No company profile found'}  )
        }
        res.status(500).send('Server Error')
        
    }
})


// @route   DELETE api/profile/
// @desc    delete user profile, user and posts
// @access  private

router.delete('/', companyAuth, async(req,res)=>{

    
    try {
        // @to-do remove jobs
        // await Post.deleteMany({ user: req.user.id })

        //remove profile
        await CompanyProfile.findOneAndRemove({company: req.company.id})

        //remove user
        await Company.findOneAndRemove({_id: req.company.id})

        res.json({msg: 'Company Account deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})




module.exports = router