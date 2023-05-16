import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileTop = ({
    auth,
    profile:{
    status,
    company,
    qualification,
    field,
    location,
    website,
    social,
    user: {_id,name, avatar}
}}) => {
  return (
    <div className="profile-top bg-primary p-8 relative">
          <div>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === _id && (
                <Link to='/edit-profile' className='btn btn-light absolute right-6 flex shadow-md' >
                    <i className="fa fa-pencil-square-o inline-block" aria-hidden="true"></i>
                    <p className="ml-2 inline-block">Edit Profile</p>
                    
                </Link>
            )}
          </div>
          <img
            className="round-img my-1"
            src={avatar}
            alt="profile pic"
          />
          <h1 className="text-6xl my-3 font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
          {qualification && field && <p className="text-3xl my-2"> {qualification} in {field}</p> }
          <p className="text-3xl my-2 ">{status} {company && <span>at {company}</span>}</p>
          <p className="text-3xl my-2">{location && <span> {location.charAt(0).toUpperCase() + location.slice(1)}</span>}</p>
          <div className="icons my-2">
            {website && (
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
                <a href={`https://${social.twitter}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
            )}
            {social && social.facebook && (
                <a href={`https://${social.facebook}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                </a>
            )}
            {social && social.linkedin && (
                <a href={`https://${social.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
            )}
            {social && social.youtube && (
                <a href={`https://${social.youtube}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x"></i>
                </a>
            )}
            {social && social.instagram && (
                <a href={`https://${social.instagram}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x"></i>
                </a>
            )}
          </div>
        </div>
  )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop