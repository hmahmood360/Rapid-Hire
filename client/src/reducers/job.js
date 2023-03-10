import { 
    ADD_JOB, 
    GET_JOBS,
    JOB_ERROR   
 } from "../actions/types"

const initialState = {
    jobs: [],
    job: null,
    loading: true,
    error: {}
}

export default function(state=initialState, action) {
    const {type, payload} = action

    switch(type){
        case ADD_JOB:
            return{
                ...state,
                jobs: [payload,...state.posts],
                loading: false
            }
        case GET_JOBS: 
            return{
                ...state,
                loading: false,
                jobs: payload
            }
        case JOB_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }

}