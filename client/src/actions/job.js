import axios from 'axios'
import {setAlert} from './alert'
import { 
    ADD_JOB,
    GET_JOBS,
    JOB_ERROR
 } from './types'

 // Add Job
export const addJob = (formData) => async dispatch => {
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