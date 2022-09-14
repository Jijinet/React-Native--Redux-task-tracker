import React, { useState } from "react";
import { Container,Col,Row, Button,Modal, Form, Spinner } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import { addTask } from "../store/task/taskAction";
import {addTaskLoading} from "../store/task/taskListSelector";


export default function AddTask() {

  const dispatch=useDispatch();
  const addTaskLoadingSelector=useSelector(addTaskLoading)
    const[show,setShow]=useState(false);

    const[taskName,setTaskName]=useState('');
    const[taskStatus,setTaskStatus]=useState('pending');

    const [error,setError]=useState('');
    const [message, setMessage] = useState("");

    const handleTaskNameChange=(e)=>{
      setTaskName(e.target.value);
    }

    const handleTaskStatusChange=(e)=>{
      setTaskStatus(e.target.value);
    }

    const handleSubmit=async ()=>{
      try {
        await dispatch(
          addTask({
            title: taskName,
            isCompleted: taskStatus === "pending" ? false : true,
          })
        );
        
        setMessage("your task is successfully added");
        setShow(false)
        setTaskName('')
        setTaskStatus('pending')
        
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
    }

    const onHide=()=>{
        setShow(false)
    }
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 2, offset: 10 }}>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Add Task
          </Button>
        </Col>
      </Row>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" noValidate>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" value={taskName} placeholder="Enter task name" onChange={handleTaskNameChange} />
            </Form.Group>

            <Form.Group as={Row} className="mb-3" onChange={handleTaskStatusChange}>
              <Form.Label as="legend" column sm={2}>
                Task Status
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Pending"
                  name="taskstatus"
                  id="pending"
                  defaultChecked
                  value="pending"
                />
                <Form.Check
                  type="radio"
                  label="Completed"
                  name="taskstatus"
                  id="completed"
                  value="completed"
                />
              </Col>
            </Form.Group>
          </Form>
          <p className="text-danger">{error}</p>
          <p className="text-success">{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => onHide()}>Cancel</Button>
          <Button variant="secondary" onClick={() => handleSubmit()}>
            {addTaskLoadingSelector && <Spinner animation="border" size="sm" />}
            Submit
            </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
