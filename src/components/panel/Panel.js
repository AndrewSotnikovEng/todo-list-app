import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import ToggleStateButton from "../buttons/ToggleStateButton";
import AddButton from "../buttons/AddButton";
import TemplateButton from "../buttons/TemplateButton";

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
            buttonName={currentState}
            toggleButtonView={() => toggleButtonView()}
            updateStateHandler={props.updateStateHandler}
          />
          <AddButton
            taskDetailsVisibilityHandler={props.taskDetailsVisibilityHandler}
            taskDetailsModeHandler={props.taskDetailsModeHandler}
          />
          <TemplateButton
            taskTemplateVisibilityHandler={props.taskTemplateVisibilityHandler}
          />
        </Stack>
      </div>
    );
}

export default Panel;