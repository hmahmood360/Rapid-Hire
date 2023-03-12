import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { register, companyRegister } from '../../actions/auth'


function Register ({setAlert, register, isAuthenticated,isCompanyAuthenticated, companyRegister })  {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [showCompanyRegister, setShowCompanyRegister] = useState(false)

    const {name, email, password, password2} = formData

    const navigate = useNavigate(); 

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (password !== password2){
            setAlert('Password does not match', 'danger ')
        }else{
          if (showCompanyRegister) {
            await companyRegister({ name, email, password })
          } else {
            await register({ name, email, password })
            navigate('/create-profile'); 
          }
          
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        
    }

    if (isAuthenticated || isCompanyAuthenticated) {
      return isCompanyAuthenticated ? (
        <Navigate to="/company-dashboard" />
      ) : (
        <Navigate to="/dashboard" />
      )
    }

    return (
    <div className='container'>
      <div className="btn-container ">
         <button disabled={!showCompanyRegister} onClick={()=> setShowCompanyRegister(!showCompanyRegister)} className={showCompanyRegister ? "btn btn-primary" : "btn btn-disable"}>User Registration</button>
         <button disabled={showCompanyRegister} onClick={()=> setShowCompanyRegister(!showCompanyRegister)} className={showCompanyRegister ? "btn btn-disable" : "btn btn-primary"}>Company Registration</button>
      </div>
      <h1 className="large text-primary">
        {showCompanyRegister ? 'Company Registration' : 'User Sign Up'}
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> 
        {showCompanyRegister ? 'Create Company Account' : 'Create User Account'}
      </p>
      <form className="form" onSubmit={e => handleSubmit(e)} >
        {showCompanyRegister && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Company Name"
              name="name"
              required
              value={name}
              onChange={e => handleChange(e)}
            />
          </div>
        )}
        {!showCompanyRegister && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={e => handleChange(e)}
            />
          </div>
        )}
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => handleChange(e)} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?
        {showCompanyRegister ? (<Link to="/login">Sign In</Link>) : (<Link to={{ pathname: '/login', state: { company: true } }}>Sign In</Link>)}
      </p>
      
    </div>
  )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    companyRegister: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated,
})

export default connect(
    mapStateToProps, 
    { setAlert, register, companyRegister }
)(Register) 