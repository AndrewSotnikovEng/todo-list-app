import React, { useState, useEffect } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { Stack } from '@chakra-ui/react'
import { MdTableRestaurant } from 'react-icons/md';
import { RiArchiveDrawerFill } from 'react-icons/ri';

function Panel(props) {

  var currentState = "active"
  
  const toggleButtonView =  () => {
    if (currentState == "backlog")
    {
      currentState = "active"
      setCurrentButton(activeButton)
    } 
    else if (currentState == "active")
    {
      currentState = "backlog"
      setCurrentButton(backlogButton) 
    }    
  }

  const activeButton = 
  (
    <Button onClick={ toggleButtonView } leftIcon={<MdTableRestaurant />} colorScheme='teal' variant='outline'>
      Стол
    </Button>
  )

  const backlogButton = 
  (
    <Button onClick={ toggleButtonView }  leftIcon={<RiArchiveDrawerFill />} colorScheme='teal' variant='outline'>
      Ящик
    </Button>
  )

  const [currentButton, setCurrentButton ] = useState(activeButton);
  // const [currentState, setCurrentState ] = useState("active");
  
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