import React,{useEffect} from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { getTask } from '../store/task/taskAction';
import { taskList,getTaskLoading } from '../store/task/taskListSelector';


export default function ListTask(){

    const dispatch = useDispatch();
    const taskListSelector=useSelector(taskList)
    const getTaskLoadingSelector = useSelector(getTaskLoading);

    useEffect(()=>{
        getTaskList();
    },[]);

    const getTaskList =()=>{
        dispatch(getTask());
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
                <ol className="list-group list-group-numbered" key={task.id}>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{task.title}</div>
                    </div>
                    <Button size="small" variant="outline-danger">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </li>
                </ol>
              );
            })}
          </Col>
        </Row>
      </Container>
    );

}