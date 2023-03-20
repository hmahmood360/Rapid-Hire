import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
    getJobById, 
    applyForJob, 
    getAppliedJobs, 
    deleteJob, 
    addToFavorites, 
    removeFromFavorites,
    deleteApplication
 } from '../../actions/job'
import JobTop from './JobTop'
import JobAbout from './JobAbout'
import JobBottom from './JobBottom'

const Job = ({
    getJobById, 
    deleteJob, 
    getAppliedJobs,
    addToFavorites, 
    removeFromFavorites,
    applyForJob, 
    deleteApplication,
    job:{job, favorite_jobs, applied_jobs, loading},
    auth
}) => {
    
    const [applied, setApplied] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const {id} = useParams()
    useEffect(()=>{
        const fetchJobs = async () => {
            await getAppliedJobs()
            await getJobById(id)

            setApplied(applied_jobs.some(jobx => jobx._id === id))
            setFavorite(favorite_jobs.some(jobx => jobx._id === id))
            
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
                {favorite ? (
                    <button onClick={() => {removeFromFavorites(id); setFavorite(!favorite)}} className="btn btn-light"><i style={{color: 'red'}} className="fa-solid fa-heart "></i> Remove from Favourites</button>
                ) : (
                    <button onClick={() => {addToFavorites(id); setFavorite(!favorite)}} className="btn btn-light"><i style={{color: 'red'}} className="fa-solid fa-heart "></i> Add to Favourites</button>
                )}
                
                {applied ? (
                    <button onClick={()=> {deleteApplication(id); setApplied(!applied)}} className="btn btn-primary">Revoke Application</button>
                ) : (
                    <button disabled={!auth.isAuthenticated} onClick={()=> {applyForJob(id); setApplied(!applied)}} className={auth.isAuthenticated ? "btn btn-primary" : "btn btn-disable"} >Apply for job</button>
                )}
            </div>
        </Fragment> )}
    </div>
  )
}

Job.propTypes = {
    getJobById: PropTypes.func.isRequired,
    applyForJob: PropTypes.func.isRequired,
    deleteApplication: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
})
    

export default connect(mapStateToProps, { getJobById, applyForJob, getAppliedJobs,  deleteJob, addToFavorites, removeFromFavorites, deleteApplication } )(Job)