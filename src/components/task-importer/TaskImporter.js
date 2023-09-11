import React, { useState } from 'react';
import styles from "./TaskImporter.css";
import { Input, Textarea, Select, Stack, Checkbox } from '@chakra-ui/react'

const TaskImporter = props => {
  if(!props.show) {
    return null
  }

  const taskNames = props.importedTasks.map((task, index) => (
    <div key={index} className="task-row">
      <input type="checkbox" />
      <label class="form-check-label" for="flexRadioDefault2" id="task-label">
        {task.name}
      </label>
    </div>
  ));

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {/* <h4 className="modal-title"> {props.taskHeader} </h4> */}
        </div>
        <div className="modal-body">{taskNames}</div>
        <div className="modal-footer">
          {/* <Input placeholder='small size' size='sm' value={props.taskHeader} /> */}
          <button
            className="button"
            onClick={() => {
              props.taskImporterVisibilityHandler(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskImporter;