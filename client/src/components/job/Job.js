import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getJobById, applyForJob, getAppliedJobs, deleteJob } from '../../actions/job'
import JobTop from './JobTop'
import JobAbout from './JobAbout'
import JobBottom from './JobBottom'

const Job = ({getJobById, deleteJob, getAppliedJobs, applyForJob, job:{job, jobs, loading}, auth}) => {
    
    const {id} = useParams()
    useEffect(()=>{
        const fetchJobs = async () => {
            await getAppliedJobs()
            await getJobById(id)
        }
        fetchJobs()
        
    },[])

    const navigate= useNavigate()
    
  return (
    <div className='container'>
        {job=== null || loading ? (
        <Spinner />
        ) : (
        <Fragment>
            <button onClick={() => navigate(-1)} className='btn btn-light' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
            {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === job.company._id && (
                <Link to={`/edit-job/${job._id}`} className='btn btn-dark ' >Edit Job</Link>
            )}
            {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === job.company._id && (
                <button onClick={() => deleteJob(job._id)} className="btn btn-danger">Delete Job</button>
            )}
            <div className="job-grid my-1">
                <JobTop job={job} />
                <JobAbout job={job} />
                <JobBottom job={job} />
                
            </div>
            <div className="btn-to-right">
                <button className="btn btn-light">Add to Favourites</button>
                {jobs.some(jobx => jobx._id === id) ? (
                    <button onClick={()=> applyForJob(id)} className="btn btn-primary">Revoke Application</button>
                ) : (
                    <button onClick={()=> applyForJob(id)} className="btn btn-primary">Apply for job</button>
                )}
                
            </div>
        </Fragment> )}
    </div>
  )
}

Job.propTypes = {
    getJobById: PropTypes.func.isRequired,
    applyForJob: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
})
    

export default connect(mapStateToProps, { getJobById, applyForJob, getAppliedJobs, deleteJob } )(Job)