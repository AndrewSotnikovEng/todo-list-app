import React from "react";
import styles from "./TaskDetails.css";
import { Input, Textarea, Select, Stack } from '@chakra-ui/react'

const TaskDetails = props => {
  if(!props.show) {
    return null
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {/* <h4 className="modal-title"> {props.taskHeader} </h4> */}
        </div>
        <div className="modal-body">
          <Input onChange={e => props.taskDetailsNameHandler(e.target.value)} size='sm' value={ props.taskHeader}  borderWidth={1} borderColor="black"/>
          <Select onChange={e => props.taskDetailsPriorityHandler(e.target.value)} size='sm' placeholder='Choose priority' borderWidth={1} borderColor="black" mt={2} value={props.taskPriority}>
            <option value='Low'>Low</option>
            <option value='High'>High</option>
          </Select>
          <Select onChange={e => props.taskDetailsStateHandler(e.target.value)} size='sm' placeholder='Choose state' borderWidth={1} borderColor="black" mt={2} value={props.taskState}>
            <option value='active'>Active</option>
            <option value='backlog'>Backlog</option>
            <option value='done'>Done</option>
          </Select>
          <Textarea onChange={e => props.taskDetailsDescriptionHandler(e.target.value)} size='sm' height={40} value={props.taskDescription} mt={2} borderWidth={1} borderColor="black"/>

        </div>
        <div className="modal-footer">
          {/* <Input placeholder='small size' size='sm' value={props.taskHeader} /> */}
          <button className="button" onClick={ () =>
            { props.taskDetailsVisibilityHandler(false); 
              props.taskDetailsOnChangeNotifier()
            }
          }>
              Close 
          </button>
        </div>
      </div>
    </div>
    )
}

export default TaskDetails;