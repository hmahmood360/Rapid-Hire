import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyProfileById } from '../../actions/profile'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CompanyProfileAbout from './CompanyProfileAbout'
import CompanyProfileTop from './CompanyProfileTop'
import CompanyProfileBottom from './CompanyProfileBottom'

const CompanyProfile = ({getCompanyProfileById, profile:{profile, loading}, auth}) => {

    const {id} = useParams()
    useEffect(()=> {
        getCompanyProfileById(id)
    },[getCompanyProfileById])
    const navigate = useNavigate()
  return (
    <div className='container'>
        {profile === null || loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <button onClick={() => navigate(-1)} className='btn btn-light' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
                {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === profile.company._id && (
                <Link to='/edit-profile' className='btn btn-dark' >Edit Profile</Link>
                )}
                <div className="profile-grid mt-1">
                    <CompanyProfileTop profile={profile} />
                    <CompanyProfileAbout profile={profile} />
                    
                </div>
                <CompanyProfileBottom profile={profile} />
            </Fragment>
        )}
    </div>
  )
}

CompanyProfile.propTypes = {
    getCompanyProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect( mapStateToProps, {getCompanyProfileById})(CompanyProfile)