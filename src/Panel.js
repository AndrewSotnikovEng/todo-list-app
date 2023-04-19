import React, { useState } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import CustomButton from "./Button";


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
          <CustomButton buttonName={ currentState } toggleButtonView={ () =>  toggleButtonView() }/> 
        </Stack>
      </div>      
    )
}

export default Panel;