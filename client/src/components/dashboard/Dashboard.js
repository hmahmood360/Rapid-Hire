
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Spinner } from '../layout/Spinner'
import { Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { DashboardActions } from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import AppliedJobs from './AppliedJobs'
import { getAppliedJobs, getFavoriteJobs } from '../../actions/job'
import FavoriteJobs from './FavoriteJobs'
import Sidebar from '../layout/Sidebar'


const Dashboard = ({ getAppliedJobs, getFavoriteJobs, job:{applied_jobs,favorite_jobs}, getCurrentProfile, auth:{ user }, profile:{profile, loading}, deleteAccount }) => {


const Dashboard = ({
  getAppliedJobs,
  getFavoriteJobs,
  job: { applied_jobs, favorite_jobs },
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getAppliedJobs();
    getFavoriteJobs();
  }, [getCurrentProfile, getAppliedJobs]);

  return (
    <>
      <Sidebar />

      {loading && profile === null ? <Spinner /> : <div className='container'>
        <div className='ml-16'>
          <h1 className="large text-primary font-bold ">Dashboard</h1>
          <div className="my-5 shadow-md py-6 px-12 rounded-md border-2 border-gray-300 ">
            {user && (
              <div className='flex items-center space-x-12'>
                <img className='rounded-full w-36 h-36' src={user.avatar} alt="" />
                <div className='flex mt-3 w-full justify-between'>
                  <div>
                    <p className="lead block">Welcome <span className='text-primary'>{user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span></p>
                    <div>
                      {profile !== null ? (
                        user && <DashboardActions id={user._id} />
                      ) : (
                        <div>
                          <p>You have not created profile.</p>  
                          <Link to='/create-profile' className='btn btn-primary my-1' >Create Profile</Link> 
                        </div>
                      )}
                    </div>
                  </div>
                  {profile && (
                    <Link className="block btn btn-primary h-12" to={`/profile/${user._id}`}>
                      <p>View Profile</p>
                  </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="my-10 grid grid-cols-4 gap-6 text-white font-semibold">
            <HashLink smooth to='#favorite_jobs' className="rounded bg-gradient-to-b from-[#FA9366] to-[#FEB39A] border border-[#FA9366] shadow-md p-6 border-lg">
              <p className="text-right text-lg">Favorite Jobs</p>
              <div className='flex items-center mt-3 justify-between'>
                <i class="fa fa-heart text-5xl" aria-hidden="true"></i>
                <p className='text-6xl'>{favorite_jobs.length}</p>
              </div>
            </HashLink>
            <HashLink smooth to='#applied_jobs' className="rounded bg-gradient-to-b from-[#06C47F] to-[#3FD09C] border border-[#06C47F] shadow-md p-6 border-lg">
              <p className="text-right text-lg">Applied Jobs</p>
              <div className='flex items-center mt-3 justify-between'>
              <i class="fa fa-briefcase text-5xl" aria-hidden="true"></i>
              <p className='text-6xl'>{applied_jobs.length}</p>
              </div>
            </HashLink>
            <div className="rounded bg-gradient-to-b from-[#FE6275] to-[#FC8393] border border-[#FE6275] shadow-md p-6 border-lg">
              <p className="text-right text-lg">Scheduled Interviews</p>
              <div className='flex items-center mt-3 justify-between'>
                <i class="fa fa-video-camera text-5xl" aria-hidden="true"></i>
                <p className='text-6xl'>0</p>
              </div>
            </div>
            <div className="rounded bg-gradient-to-b from-[#03ABAD] to-[#47C0C3] border border-[#03ABAD] shadow-md p-6 border-lg">
              <p className="text-right text-lg">Unread Messages</p>
              <div className='flex items-center mt-3 justify-between'> 
                <i class="fa fa-comments text-5xl" aria-hidden="true"></i>
                <p className='text-6xl'>0</p>
              </div>
            </div>
          </div>
          
          {profile !== null ? (
            // User has profile
          <Fragment>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <AppliedJobs jobs={applied_jobs} />
            <FavoriteJobs jobs={favorite_jobs} />
            <div className='mt-2 mb-10'>
              <button onClick={() => deleteAccount()} className="btn btn-danger">
                <i className="fas fa-user-minus"></i>
                <p className='inline-block ml-1'>Delete Account</p>
              </button>
            </div>
          </Fragment>) : (
          null
          )}
        </div>
    </div>}
    </>
  )
}


Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAppliedJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getAppliedJobs,
  getFavoriteJobs,
})(Dashboard);
