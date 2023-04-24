import React from "react";
import styles from "./TaskDetails.css";
import { Input, Textarea, Select, Stack } from '@chakra-ui/react'

const TaskDetails = props => {
  console.log(props.show, props.taskHeader);
  if(!props.show) {
    return null
  }

  function handleChange(event) {
    // console.log(event);
    props.taskHeaderHandler(event)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {/* <h4 className="modal-title"> {props.taskHeader} </h4> */}
        </div>
        <div className="modal-body">
          <Input onChange={e => handleChange(e.target.value)} size='sm' value={ props.taskHeader}  borderWidth={1} borderColor="black"/>
          <Select size='sm' placeholder='Choose priority' borderWidth={1} borderColor="black" mt={2}>
            <option value='Low' selected="true">Low</option>
            <option value='High'>High</option>
          </Select>
          <Textarea size='sm' height={40} value={props.taskDescription} mt={2} borderWidth={1} borderColor="black"/>

        </div>
        <div className="modal-footer">
          {/* <Input placeholder='small size' size='sm' value={props.taskHeader} /> */}
          <button className="button" onClick={ () => props.handler(false) }>Close </button>
        </div>
      </div>
    </div>
    )
}

export default TaskDetails;