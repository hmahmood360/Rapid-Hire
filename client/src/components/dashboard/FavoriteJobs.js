import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeFromFavorites } from '../../actions/job'
import { Link } from 'react-router-dom'

const FavoriteJobs = ({jobs, removeFromFavorites}) => {
  return (
    <Fragment>
        <h2 className="mt-2">Favorite Jobs</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th className="hide-sm">Company</th>
                    <th className="hide-sm">Type</th>
                    <th className="hide-sm">Location</th>
                    <th ></th>
                    <th ></th>
                </tr>
            </thead>
            <tbody>
                {jobs ? (jobs.map(job => (
                    <tr key={job._id}>
                        <td>{job.title}</td>
                        <td className="hide-sm"> {job.company.name} </td>
                        <td className="hide-sm"> {job.type} </td>
                        <td className="hide-sm"> {job.location} </td>
                        <td>
                            <Link className='btn btn-primary' to={`/job/${job._id}`} >
                                <p>View Job</p>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => removeFromFavorites(job._id)} className="btn btn-danger">Remove</button>
                        </td>
                    </tr>
                ))
                ) : (
                    <p>You haven't applied to any job</p>
                ) }
            </tbody>
        </table>
    </Fragment>
  )
}

FavoriteJobs.propTypes = {
    jobs: PropTypes.array.isRequired,
    removeFromFavorites: PropTypes.func.isRequired
}

export default connect( null, {removeFromFavorites})(FavoriteJobs)