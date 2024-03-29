import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import ToggleStateButton from "../buttons/ToggleStateButton";
import AddButton from "../buttons/AddButton";
import TemplateButton from "../buttons/TemplateButton";
import FinishedTasksButton from "../buttons/FinishedTasksButton";
import ImportTasksButton from "../buttons/ImportTasksButton";

function Panel(props) {
  
  const toggleButtonView =  () => {
    if (currentState == "backlog")
    {
      setCurrentState("active")
      props.changeTableState("active")
    } 
    else if (currentState == "active")
    {
      setCurrentState("backlog")
      props.changeTableState("backlog")
    }    
  }

  const [currentState, setCurrentState ] = useState("active");

    return (
      <div>
        <Stack direction="row" spacing={4} m="30px">
          <ToggleStateButton
            id="toggle-state-btn"
            buttonName={currentState}
            toggleButtonView={() => toggleButtonView()}
            switchTableState={props.switchTableState}
          />
          <AddButton
            id="add-task-btn"
            taskDetailsVisibilityHandler={props.taskDetailsVisibilityHandler}
            taskDetailsModeHandler={props.taskDetailsModeHandler}
          />
          <TemplateButton
            id="template-btn"
            taskTemplateVisibilityHandler={props.taskTemplateVisibilityHandler}
          />
          <FinishedTasksButton
            id="finished-tasks-btn"
            tableState={props.tableState}
            setTableState={props.setTableState}
            showFinishedTasks={props.showFinishedTasks}
            // updateTableState={props.updateTableState}
            // taskTemplateVisibilityHandler={props.taskTemplateVisibilityHandler}
          />
          <ImportTasksButton 
            taskImporterVisibilityHandler={props.taskImporterVisibilityHandler}
            // taskImporterUpdateHandler={props.taskImporterUpdateHandler}
          />
        </Stack>
      </div>
    );
}

export default Panel;