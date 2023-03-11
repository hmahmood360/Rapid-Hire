import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Spinner} from '../layout/Spinner'
import {connect} from 'react-redux'
import JobItem from './JobItem'
import { getJobs } from '../../actions/job'

const Jobs = ({getJobs, job:{ jobs, loading}}) => {
    useEffect(()=>{
        getJobs()
    },[getJobs])
  return (
    loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Jobs</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <div className="posts">
                {jobs.map(job => (
                    <JobItem key={job._id} job={job} />
                ))}
            </div>
        </Fragment>
    ) 
  )
}

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    job: state.job
})

export default connect( mapStateToProps,{getJobs} )( Jobs)