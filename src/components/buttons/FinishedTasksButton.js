import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { AiOutlineFileDone } from 'react-icons/ai';

function FinishedTasksButton(props) {

  const [isFinishState, setIsFinishState] = useState(false);
  const [prevousTableState, setPreviousTableState] = useState("");

    return (
      <Button
        backgroundColor={ isFinishState ? "lightgray" : "none"}
        // backgroundColor={"blue"}
        onClick={ () => { 
            if(!isFinishState) { //activating swtiching state
              if(props.tableState != "done") {
                setPreviousTableState(props.tableState)
              }
              props.showFinishedTasks(true);
              setIsFinishState(true)
            } else {              //deactivating
              setPreviousTableState("")              
              props.setTableState(prevousTableState)
              props.showFinishedTasks(false);
              setIsFinishState(false)
            }
        }
        } 
        w={"120px"}
        leftIcon={<AiOutlineFileDone/>}
        colorScheme="teal"
        variant="outline"
      >
        Finished
      </Button>
    );
}

export default FinishedTasksButton