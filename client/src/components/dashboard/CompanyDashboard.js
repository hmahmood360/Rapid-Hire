import React,{ Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../layout/Spinner'
import { getCurrentCompanyProfile, deleteCompanyAccount } from '../../actions/profile'

const CompanyDashboard = ({getCurrentCompanyProfile, deleteCompanyAccount, auth:{ company }, profile:{profile, loading}}) => {

  useEffect(() => {
     async function fetchData() {
      await getCurrentCompanyProfile()
    }
    fetchData();
  }, [loading]);

  return (
    loading && profile === null ? <Spinner /> : <div className='container'>
      <h1 className="large text-primary">Company Dashboard</h1>
      <div className="lead">
        <i className="fas fa-user "></i>
        <p className='inline-block ml-1'>
          Welcome {company && company.name.charAt(0).toUpperCase() + company.name.slice(1)}
        </p>
        
      </div>
      
      {profile !== null ? (
        // Company has profile
      <Fragment>
        {/* Dashboard Actions */}
        <div className="dash-buttons">
          <Link to='/edit-company-profile' className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i>
            <p className='inline-block ml'>Edit Profile</p>
          </Link>
          <Link to={'/post-job'} className="btn btn-light">
            <i className="fa fa-briefcase text-primary"></i>
            <p className='inline-block ml'>Post Job</p>
          </Link>
          <Link to={`/company-profile/${company._id}`}  className="btn btn-primary">
            <p className='inline-block ml'>View Company Profile</p>
          </Link>
        </div>
        
        <div className='my-2'>
          <button onClick={() => deleteCompanyAccount()} className="btn btn-danger">
            <i className="fas fa-user-minus"></i>
            Delete Account
          </button>
        </div>
      </Fragment>) : (
        // Company does not have Profile
      <Fragment>
        <p>You have not created profile.</p>
        <p>To post a job You must create Profile</p>
        <Link to='/create-company-profile' className='btn btn-primary my-1' >Create Profile</Link> 
      </Fragment>
      )}
      
    </div>
    
    
  )
}

CompanyDashboard.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  deleteCompanyAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps,{getCurrentCompanyProfile, deleteCompanyAccount})(CompanyDashboard)