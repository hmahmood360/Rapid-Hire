import React from 'react'
import PropTypes from 'prop-types'

const JobTop = ({job:{title,location,company}}) => {
  return (
    <div className="job-top bg-primary p-2">
        {/* insert image here */}
        <h2 className="text-center large my-1">{title}</h2>
        <p className="text-center medium">{company.name}</p>
        <p className="text-center">{location}</p>  
        {/* add socials here */}
    </div>
  )
}

JobTop.propTypes = {}

export default JobTop