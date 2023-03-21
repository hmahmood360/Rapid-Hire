import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const JobBottom = ({job:{type, company, gender, qualification, salaryFrom, salaryTo, positions, date}}) => {
  return (
    <div className="job-details bg-white p-2">
        <h2 className="text-primary">Job Details</h2>
        {type && <p className="mt"><strong>Job Type:</strong>{type}</p>}
        {gender && <p className="mt"><strong>Gender:</strong> {gender}</p>}
        {qualification && <p className="mt"><strong>Qualification Required:</strong> {qualification}</p>}
        {salaryFrom && salaryTo && <p className="mt"><strong>Salary:</strong>{salaryFrom} - {salaryTo} per year</p>}
        {positions && <p className="mt"><strong>Positions Available:</strong> {positions}</p>}
        <p className="mt"><strong>Posting Date:</strong><Moment format='DD/MM/YYYY' >{date}</Moment></p>
        <Link to={`/company-profile/${company._id}`} className="btn btn-primary mt-2">View Company Profile</Link>
    </div>
  )
}

JobBottom.propTypes = {}

export default JobBottom