import React from "react";
// import styles from "./TaskDetails.css";
import { Input, Select, Stack, Button, Flex } from '@chakra-ui/react'

const TaskTemplate = props => {
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
          <Input
            size="sm"
            value={props.taskHeader}
            borderWidth={1}
            borderColor="black"
          />

          <Flex>
            <Select
              size="sm"
              placeholder="Select template"
              borderWidth={1}
              borderColor="black"
              mt={2}
            >
              <option value="task1">Task template 1</option>
              <option value="task2">Task template 2</option>
            </Select>
            <Button size="sm" ml={2} mt={2} borderWidth={1} borderColor={"black"}>
              +
            </Button>
          </Flex>
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