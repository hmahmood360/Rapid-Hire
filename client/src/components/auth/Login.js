import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

function Login({login, isAuthenticated}) {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '' 
    })

    const {email, password} = formData

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        login({email, password})
        
    }

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name] : e.target.value})
        
    }
    //Redirect if logged in
    if (isAuthenticated){
      return <Navigate to='/dashboard' />
    }


  return (
    <div >
        <h1 className="large text-primary">Log in</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in Account</p>
      <form className="form" onSubmit={e => handleSubmit(e)} >
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => handleChange(e)} />
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
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ login })(Login) 