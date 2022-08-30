import * as taskActionType from './taskActionType';

const initialState={
    taskList:[],
    getTaskLoading:false
}

const taskReducer = (state=initialState,{type,payload})=>{

    switch (type) {
      case taskActionType.GET_TASK_BEGINS:
        return {
          ...state,
          getTaskLoading: true,
        }
      case taskActionType.GET_TASK_SUCCESS:
        return {
          ...state,
          taskList:payload,
          getTaskLoading: false,
        }
      case taskActionType.GET_TASK_FAILURE:
        return {
          ...state,
          getTaskLoading: false,
        }
      default:
        return state;
    }
}


export default taskReducer;