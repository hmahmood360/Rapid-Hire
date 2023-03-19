import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Spinner} from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    
    useEffect(() => {
        getProfiles()
      }, [getProfiles]);

      const navigate = useNavigate(-1)

  return (
    <div className='container'>
        <button onClick={() => navigate(-1)} className='btn btn-light mb-1' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
        {loading || profiles===null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Users</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>
                Browse and Connect with Other Users
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))
                ) : (
                    <h4>No profiles found </h4>
                )}
            </div>
            </Fragment>}
    </div>
  )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})( Profiles)