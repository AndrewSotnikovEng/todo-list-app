import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import ToggleStateButton from "../buttons/ToggleStateButton";
import AddButton from "../buttons/AddButton";

function Panel(props) {
  
  const toggleButtonView =  () => {
    if (currentState == "backlog")
    {
      setCurrentState("active")
      props.changeTableState("active")
      console.log("State was changed to ative");
    } 
    else if (currentState == "active")
    {
      setCurrentState("backlog")
      props.changeTableState("backlog")
      console.log("State was changed to backlog");
    }    
  }

  const [currentState, setCurrentState ] = useState("active");

    return (
      <div>
        <Stack direction='row' 
        spacing={4}
        m="30px">
          <ToggleStateButton buttonName={ currentState } toggleButtonView={ () =>  toggleButtonView() }/> 
          <AddButton 
            taskDetailsVisibilityHandler={ props.taskDetailsVisibilityHandler }
            taskDetailsModeHandler= { props.taskDetailsModeHandler }
          /> 
        </Stack>
      </div>      
    )
}

export default Panel;