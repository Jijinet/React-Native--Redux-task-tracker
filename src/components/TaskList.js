import React,{useEffect,useState} from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { deleteTask, getTask,updateTask } from '../store/task/taskAction';
import { taskList,getTaskLoading, deleteTaskLoading, updateTaskLoading } from '../store/task/taskListSelector';


export default function ListTask(){

    const dispatch = useDispatch();
    const taskListSelector=useSelector(taskList)
    const getTaskLoadingSelector = useSelector(getTaskLoading);
    const deleteTaskLoadingSelector = useSelector(deleteTaskLoading);
    const updateTaskLoadingSelector = useSelector(updateTaskLoading);

    const [deleteTaskId,setDeleteTaskId]=useState(null);
    const [updateTaskId, setUpdateTaskId] = useState(null);

    useEffect(()=>{
        getTaskList();
    },[]);

    const getTaskList =()=>{
        dispatch(getTask());
    }

    const removeTask=(task)=>{
      setDeleteTaskId(task.id)
      dispatch(deleteTask(task.id))
    }

    const updateTaskStatus=(task)=>{
      setUpdateTaskId(task.id);
      dispatch(updateTask({
        ...task,
        isCompleted:true
      }))
    }

    return (
      <Container>
        {getTaskLoadingSelector && (
          <Spinner animation="grow" className="center" variant='primary' />
        )}
        <Row className="mt-5">
          <Col>
            {taskListSelector.map((task) => {
              return (
                <li
                  className={`${
                    task.isCompleted
                      ? "text-success text-decoration-line-through"
                      : "text-danger"
                  } list-group-item d-flex justify-content-between align-items-start`}
                  key={task.id}
                >
                  <span>{task.title}</span>
                  <div>
                    {!task.isCompleted && (
                      <Button
                        size="small"
                        variant="outline-secondary"
                        onClick={() => updateTaskStatus(task)}
                      >
                        {updateTaskLoadingSelector &&
                          task.id === updateTaskId && (
                            <Spinner animation="border" size="sm" />
                          )}
                        <i className="fa-solid fa-check"></i>
                      </Button>
                    )}

                    <Button
                      size="small"
                      variant="outline-danger"
                      onClick={() => removeTask(task)}
                    >
                      {deleteTaskLoadingSelector &&
                        task.id === deleteTaskId && (
                          <Spinner animation="border" size="sm" />
                        )}
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </li>
              );
            })}
          </Col>
        </Row>
      </Container>
    );

}