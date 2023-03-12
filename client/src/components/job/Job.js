import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { Link, useParams } from 'react-router-dom'
import { getJobById, ApplyForJob } from '../../actions/job'

import JobTop from './JobTop'
import JobAbout from './JobAbout'
import JobBottom from './JobBottom'

const Job = ({getJobById,ApplyForJob, job:{job, loading}, auth}) => {

    const {id} = useParams()
    useEffect(()=>{
        getJobById(id)
    },[getJobById])

  return (
    <div className='container'>
        {job=== null || loading ? (
        <Spinner />
        ) : (
        <Fragment>
            <Link to='/jobs' className='btn btn-light' >Back to Jobs</Link>
            {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === job.company._id && (
                <Link to={`/edit-job/${job._id}`} className='btn btn-dark ' >Edit Job</Link>
            )}
            {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === job.company._id && (
                <Link to='/edit-profile' className='btn btn-danger ' >Delete Job</Link>
            )}
            <div className="job-grid my-1">
                <JobTop job={job} />
                <JobAbout job={job} />
                <JobBottom job={job} />
                
            </div>
            <div className="btn-to-right">
                <button className="btn btn-light">Add to Favourites</button>
                <button onClick={()=> ApplyForJob(id)} className="btn btn-primary">Apply for job</button>
            </div>
        </Fragment> )}
    </div>
  )
}

Job.propTypes = {
    getJobById: PropTypes.func.isRequired,
    ApplyForJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
})
    

export default connect(mapStateToProps, { getJobById, ApplyForJob } )(Job)