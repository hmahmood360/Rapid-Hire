import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteJob } from '../../actions/job'

const PostedJobs = ({jobs, deleteJob}) => {
    const postedJobs = jobs.map(job => (
        <tr key={job._id}>
            <td>{job.title}</td>
            <td className="hide-sm"> {job.type} </td>
            <td className="hide-sm"> {job.location} </td>
            <td>
                <Link className='btn btn-primary' to={`/job-company/${job._id}`} >
                    <p>View Job</p>
                </Link>
            </td>
            <td>
                <button onClick={() => deleteJob(job._id)} className="btn btn-danger">Delete Job</button>
            </td>
        </tr>
    ))
  return (
    <div>
        <h2 className="mt-2">Posted Jobs</h2>
        {postedJobs.length > 0 ? (
            <table className="table">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th className="hide-sm">Type</th>
                    <th className="hide-sm">Location</th>
                    <th ></th>
                    <th ></th>
                </tr>
            </thead>
            <tbody>
                { postedJobs }
            </tbody>
        </table>
        ) : (
            <div>
                <span>
                    You have not posted any job
                </span>
            </div>
        ) }
    </div>
  )
}

PostedJobs.propTypes = {
    jobs: PropTypes.array,
    deleteJob: PropTypes.func.isRequired
}

export default connect(null, {deleteJob})(PostedJobs)