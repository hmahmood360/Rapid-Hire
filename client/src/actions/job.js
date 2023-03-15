import axios from 'axios'
import {setAlert} from './alert'
import { 
    ADD_JOB,
    GET_JOBS,
    JOB_ERROR,
    GET_JOB,
    UPDATE_JOBS,
    DELETE_JOB

 } from './types'

 // Add Job
export const addJob = (formData, update=0) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/jobs',formData, config)
        dispatch({
            type: ADD_JOB,
            payload: res.data
        })
        dispatch(
            setAlert('Job Posted', 'success')
        )

    } catch (err) { 
        if (err.response) {
            dispatch({
              type: JOB_ERROR,
              payload: {msg: err.response.statusText, status: err.response.status}
            })
          } else {
            dispatch({
              type: JOB_ERROR,
              payload: {msg: err.message, status: null}
            })
          }
    }
}

// Edit job
export const editJob = (formData,jobId) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/jobs/${jobId}`, formData, config)

        dispatch({
            type: GET_JOB,
            payload: res.data
        })
        dispatch(setAlert('Profile Updated', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}

// Get Jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs')
        dispatch({
            type: GET_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get Jobs user has applied to
export const getAppliedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs/applied')
        dispatch({
            type: UPDATE_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Get Get single Job by id
export const getJobById = (jobID) => async dispatch => {
    try { 
        const res = await axios.get(`/api/jobs/job/${jobID}`)

        dispatch({
            type: GET_JOB,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// User apply for job
export const applyForJob = (jobID) => async dispatch => {
    try {
        await axios.post(`/api/jobs/apply/${jobID}`)
        const res = await axios.get(`/api/jobs/job/${jobID}`)
        dispatch({
            type: GET_JOB,
            payload: res.data
        })
        dispatch(setAlert('You have successfully applied for job', 'success'))
    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// User Delete job application
export const deleteApplication = (jobId) => async dispatch => {
    try {
        console.log(jobId)
        await axios.delete(`/api/jobs/apply/${jobId}`);
        dispatch({
            type: DELETE_JOB,
            payload: jobId
        })
        dispatch(setAlert('You have deleted your application request', 'success'))
    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



