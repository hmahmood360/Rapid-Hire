import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const CompanyProfileAbout = ({
  profile:{
    company:{name},
    about
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {about && (
        <Fragment>
            <h2 className="text-primary">{name.trim().split(' ')[0].charAt(0).toUpperCase() + name.slice(1)}'s About</h2>
            <p>
                {about}
            </p>
        </Fragment>)}
    </div>
  )
}

CompanyProfileAbout.propTypes = {}

export default CompanyProfileAbout