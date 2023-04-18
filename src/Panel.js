import React, { useState, useEffect } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import { MdTableRestaurant } from 'react-icons/md';
import { RiArchiveDrawerFill } from 'react-icons/ri';

function Panel(props) {
  
  const toggleButtonView =  () => {
    if (currentState == "backlog")
    {
      setCurrentState("active")
      setCurrentButton(activeButton)
      console.log("State was changed to ative");
    } 
    else if (currentState == "active")
    {
      setCurrentState("backlog")
      setCurrentButton(backlogButton) 
      console.log("State was changed to backlog");
    }    
    console.log("Current state: " + currentState);
  }

  const activeButton = 
  (
    <Button onClick={ toggleButtonView } leftIcon={<MdTableRestaurant />} colorScheme='teal' variant='outline'>
      Active
    </Button>
  )

  const backlogButton = 
  (
    <Button onClick={ toggleButtonView }  leftIcon={<RiArchiveDrawerFill />} colorScheme='teal' variant='outline'>
      Backlog
    </Button>
  )

  const [currentButton, setCurrentButton ] = useState(activeButton);
  const [currentState, setCurrentState ] = useState("active");
  
    return (
      <div>
        <Stack direction='row' 
        spacing={4}
        m="30px">
          { currentButton }
          <p>{ currentState }</p>
        </Stack>
      </div>      
    )
}

export default Panel;