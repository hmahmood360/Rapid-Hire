import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

const Profile = ({getProfileById, profile:{profile, loading}, auth}) => {
    const {id} = useParams()
    useEffect(()=>{
        getProfileById(id)
    },[getProfileById])

    const navigate = useNavigate()
  return (
    <div className='container'>
        {profile === null || loading ? (
        <Spinner />
        ) : (
        <div className='ml-16'>
            <button onClick={() => navigate(-1)} className='btn btn-light mr-6' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
            
            <div className="profile-grid my-12">
                <ProfileTop profile={profile} auth={auth} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-6">
                    <h2 className="text-primary text-3xl font-semibold"> Experience: </h2>
                    {profile.experience.length > 0 ? (
                        <Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience} />
                            ))}
                        </Fragment>
                    ) : (<h4> No expereince credentials found</h4>) }
                </div>
                <div className="profile-edu bg-white p-6  ">
                    <h2 className="text-primary text-3xl font-semibold"> Education: </h2>
                    {profile.education.length > 0 ? (
                        <Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation key={education._id} education={education} />
                            ))}
                        </Fragment>
                    ) : (<h4> No expereince credentials found</h4>) }
                </div>
            </div>
        </div> )}
    </div>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
    

export default connect(mapStateToProps, {getProfileById})(Profile)