import React, { useState } from "react";
import { Input, Select, Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import { AiFillPlusCircle, AiOutlineCheck } from 'react-icons/ai';
import styles from "./TaskTemplate.css";

function TaskTemplate(props) {

    const [ currentState, setCurrentState ] = useState("selecting")
    const [ additionModeVisibility, setAdditionModeVisibility ] = useState("none")
    const [ selectingModeVisibility, setSelectingModeVisibility ] = useState("inline")
    // function showForState() {

    //         console.log(currentState)
    //         if (currentState == "selecting") {
             
    //         } else if (currentState == "adding") {
    //           <Input
    //             size="sm"
    //             value={props.taskHeader}
    //             borderWidth={1}
    //             borderColor="black"
    //           />;
    //         }
    //       }
    // }

    if(!props.show) {
    return null
    }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          {/* <h4 className="modal-title"> {props.taskHeader} </h4> */}
        </div>
        <div className="modal-body">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            maxWidth={"500px"}
          >
            <GridItem rowSpan={1} colSpan={2}>
              <Input
                size="sm"
                value={props.taskHeader}
                borderWidth={1}
                borderColor="black"
                maxWidth={"450px"}
              />
            </GridItem>
            <GridItem display={selectingModeVisibility} colSpan={1} w={"450px"}>
              <Select
                size="sm"
                placeholder="Select template"
                borderWidth={1}
                borderColor="black"
                mt={2}
                w={"450px"}
              >
                <option value="task1">Task template 1</option>
                <option value="task2">Task template 2</option>
              </Select>
            </GridItem>
            <GridItem display={selectingModeVisibility} colSpan={1}>
              <Button
                leftIcon={<AiFillPlusCircle />}
                size="sm"
                ml={3}
                mt={2}
                pl={3}
                pr={1}
                borderWidth={1}
                borderColor={"black"}
                onClick={() => {
                  setSelectingModeVisibility("none");
                  setAdditionModeVisibility("inline");
                }}
              />
            </GridItem>
            <GridItem display={additionModeVisibility} colSpan={1} w={"450px"}>
              <Input
                size="sm"
                value={props.taskHeader}
                borderWidth={1}
                borderColor="black"
                mt={2}
              />
            </GridItem>
            <GridItem display={additionModeVisibility} colSpan={1}>
              <Button
                leftIcon={<AiOutlineCheck />}
                size="sm"
                ml={3}
                mt={2}
                pl={3}
                pr={1}
                borderWidth={1}
                borderColor={"black"}
                onClick={() => {
                  setSelectingModeVisibility("inline");
                  setAdditionModeVisibility("none");
                }}
              />
            </GridItem>
          </Grid>
        </div>
        <div className="modal-footer">
          <button
            className="button"
            onClick={() => {
              props.taskTemplateVisibilityHandler(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


export default TaskTemplate;