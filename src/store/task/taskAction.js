import axios from 'axios';
import apiConfig from '../../config/api';
import * as taskActionType from './taskActionType'

export const getTask=()=> async (dispatch)=>{
    try {
        dispatch({type:taskActionType.GET_TASK_BEGINS})
        const result = await axios.get(`${apiConfig.API_BASE_URL}/tasks`);
        
            dispatch({
            type: taskActionType.GET_TASK_SUCCESS,
            payload: result.data,
            });
       
    } catch (error) {
         dispatch({ type: taskActionType.GET_TASK_FAILURE });
        console.log(error)
    }
}