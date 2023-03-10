import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CompanyDashboard = props => {
  return (
    <div>
        <Link to={'/post-job'} className="btn">Post Job</Link>
    </div>
    
  )
}

CompanyDashboard.propTypes = {}

export default CompanyDashboard