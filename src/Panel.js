import React, { useState, useEffect } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import { MdTableRestaurant } from 'react-icons/md';
import { RiArchiveDrawerFill } from 'react-icons/ri';


function Panel(props) {
  
  const CustomButton = ( { buttonName } ) => (
  
    <Button onClick={ toggleButtonView } leftIcon={<MdTableRestaurant />} colorScheme='teal' variant='outline'>
      { buttonName }
    </Button>
    
  )

  const toggleButtonView =  () => {
    if (currentState == "backlog")
    {
      setCurrentState("active")
      console.log("State was changed to ative");
    } 
    else if (currentState == "active")
    {
      setCurrentState("backlog")
      console.log("State was changed to backlog");
    }    
    console.log("Current state: " + currentState);
  }

  const [currentState, setCurrentState ] = useState("active");

  
    return (
      <div>
        <Stack direction='row' 
        spacing={4}
        m="30px">
          <CustomButton buttonName={ currentState }/> 
          <p>{ currentState }</p>
        </Stack>
      </div>      
    )
}

export default Panel;