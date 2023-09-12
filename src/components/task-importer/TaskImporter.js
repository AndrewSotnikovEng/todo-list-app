import React, { useState } from 'react';
import styles from "./TaskImporter.css";
import { Input, Textarea, Select, Stack, Checkbox } from '@chakra-ui/react'

const TaskImporter = props => {

  const [selectedTasks, setSelectedTasks] = useState([] );

  React.useEffect(() => {

    const initialSelectedTasks =  props.importedTasks;
    initialSelectedTasks.map((task) => (task.completed = false));
    setSelectedTasks(initialSelectedTasks);

  }, [props.show]);
  
  if(!props.show) {
    return null
  }

  // const [selectedTasks, setSelectedTasks] = useState(props.selectedTasks);

  const handleCheckboxClick = (taskId) => {

    var updatedTasks = selectedTasks
    updatedTasks.map( (task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      } 
    }
    );
    setSelectedTasks(updatedTasks);

    console.log(updatedTasks)
  };

  const taskNames = props.importedTasks.map((task, index) => (
    <div key={index} className="task-row">
      <input type="checkbox" id={`checkbox-${index}`} onChange={() => handleCheckboxClick(task.id)}/>
      <label
        htmlFor={`checkbox-${index}`}
        className="task-label"
        id={`task-label-${index}`}
      >
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