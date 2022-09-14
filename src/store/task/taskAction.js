import axios from 'axios';
import apiConfig from '../../config/api';
import * as taskActionType from './taskActionType';
import { toast } from "react-toastify";

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
        toast.error(error.message,{autoClose:true})
    }
}


export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.ADD_TASK_BEGINS });
    const result = await axios.post(`${apiConfig.API_BASE_URL}/tasks`,taskData);

    dispatch({
      type: taskActionType.ADD_TASK_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({ type: taskActionType.ADD_TASK_FAILURE });
    console.log(error);
  }
};


export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.DELETE_TASK_BEGINS });
    const result = await axios.delete(
      `${apiConfig.API_BASE_URL}/tasks/${id}`
    );

    dispatch({
      type: taskActionType.DELETE_TASK_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({ type: taskActionType.DELETE_TASK_FAILURE });
    console.log(error);
  }
};

export const updateTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.UPDATE_TASK_BEGINS });
    const result = await axios.put(
      `${apiConfig.API_BASE_URL}/tasks/${taskData.id}`,
      taskData
    );

    dispatch({
      type: taskActionType.UPDATE_TASK_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({ type: taskActionType.UPDATE_TASK_FAILURE });
    console.log(error);
  }
};