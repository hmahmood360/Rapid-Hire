import React from 'react'
import PropTypes from 'prop-types'

const JobAbout = ({job:{description,requiredSkills}}) => {
  return (
    <div className="job-about bg-light p-2">
        <h2 className="text-primary">Job Description:</h2>
        <p>{description}</p>
        <div className="line"></div>    
        <h2 className="text-primary mt-1">Skills Required:</h2>
        {requiredSkills.map((skill, index) => {
            <div key={index } className="p-1"><i className="fas fa-check"></i> {skill} </div>
        })}
    </div>
  )
}

JobAbout.propTypes = {}

export default JobAbout