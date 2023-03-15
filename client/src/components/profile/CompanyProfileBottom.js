import React from 'react'
import PropTypes from 'prop-types'

const CompanyProfileBottom = ({
    profile:{
        headcount,
        industry
    }
}) => {
  return (
    <div className="profile-bottom bg-light p-2">
        <h2 className='text-primary'>Copanies Details:</h2>
        {headcount && <p><strong>HeadCount:</strong> {headcount} </p>}
        <p><strong>Industry:</strong> {industry} </p>
    </div>
  )
}

CompanyProfileBottom.propTypes = {}

export default CompanyProfileBottom