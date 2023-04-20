import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Spinner } from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { DashboardActions } from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import AppliedJobs from './AppliedJobs'
import { getAppliedJobs, getFavoriteJobs } from '../../actions/job'
import FavoriteJobs from './FavoriteJobs'


const Dashboard = ({ getAppliedJobs, getFavoriteJobs, job:{applied_jobs,favorite_jobs}, getCurrentProfile, auth:{ user }, profile:{profile, loading}, deleteAccount }) => {

  useEffect(() => {
    getCurrentProfile()
    getAppliedJobs()
    getFavoriteJobs()
  },[getCurrentProfile, getAppliedJobs])

  return (
    loading && profile === null ? <Spinner /> : <div className='container'>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user "></i>
        <span className='inline-block ml-1 '>Welcome {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span>
      </p>
      {profile !== null ? (
        // User has profile
      <Fragment>
        {user._id && <DashboardActions id={user._id} />}
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <AppliedJobs jobs={applied_jobs} />
        <FavoriteJobs jobs={favorite_jobs} />
        <div className='my-2'>
          <button onClick={() => deleteAccount()} className="btn btn-danger">
            <i className="fas fa-user-minus"></i>
            <p className='inline-block ml-1'>Delete Account</p>
          </button>
        </div>
      </Fragment>) : (
        // User does not have Profile
      <Fragment>
        <p>You have not created profile.</p>  
        <Link to='/create-profile' className='btn btn-primary my-1' >Create Profile</Link> 
      </Fragment>
      )}
    </div>
  )
}

Dashboard.propTypes = { 
  getCurrentProfile: PropTypes.func.isRequired,
  getAppliedJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
  
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getAppliedJobs, getFavoriteJobs })(Dashboard)