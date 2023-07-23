import React, { useState, useEffect , KeyboardEvent} from "react";
import { Input, Select, Button, Flex, Grid, GridItem, Tooltip } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { AiFillPlusCircle, AiOutlineCheck } from 'react-icons/ai';
import {MdDriveFileRenameOutline, MdOutlineDeleteOutline } from 'react-icons/md'
import {GrActions} from 'react-icons/gr'
import styles from "./TaskTemplate.css";

function TaskTemplate(props) {

    const [ currentState, setCurrentState ] = useState("selecting")
    const [ currentFilterValue , setCurrentFilterValue ] = useState("")
    const [ filteredTemplates , setFilteredTemplates ] = useState([])
    const [ selectedTemplateValue, setSelectedTemplateValue ] = useState([])
    const [ additionModeVisibility, setAdditionModeVisibility ] = useState("none")
    const [ filterVisibility, setFilterVisibility ] = useState("visible")
    const [ selectingModeVisibility, setSelectingModeVisibility ] = useState("inline")
    const [ templateInputValue, setTemplateInputBlockValue ] = useState("")
    const [ templateEditingMode, setTemplateEditingMode ] = useState(false)
    const [ isFocused, setIsFocused ] = useState(false)
    const [ toolTipInfo, setTooltipInfo ] = useState("")

    const hendleSelectChange = (e) => {
      setSelectedTemplateValue(e.target.value);
      // console.log(selectedTemplateValue);
    };

    useEffect( () => {
      setFilteredTemplates(props.templates)
    }, [props.templates] )

    useEffect(() => {
      if (!templateEditingMode) {
        setFilteredTemplates( props.templates.filter (template => template.name.toLowerCase()
        .includes(currentFilterValue.toLowerCase() )))
      } else {
        setFilteredTemplates( props.templates.filter (template => template.name.toLowerCase()
        .includes("")))
      }
 
      // console.log("Updated filter value: ", currentFilterValue);
    }, [currentFilterValue]);


    useEffect( () =>  {
      console.log(selectedTemplateValue);
    }, [selectedTemplateValue])

    if(!props.show) {
    return null
    }

  return (
    <div className="modal" id="modal-win">
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
            <GridItem rowSpan={1} colSpan={1} visibility={filterVisibility}>
              <Tooltip
                width="100%"
                label={toolTipInfo}
                placement="bottom"
                bg="black"
                color="white"
              >
                <Input
                  size="sm"
                  id="filter-template-input"
                  value={currentFilterValue}
                  borderWidth={1}
                  borderColor="black"
                  maxWidth={"450px"}
                  onFocus={() => {
                    // setIsFocused(true);
                  }}
                  boxShadow={isFocused ? `0px 0px 2px 2px blue` : "none"}
                  onChange={(e) => {
                    e.persist();
                    setCurrentFilterValue(e.target.value);
                  }}
                  onKeyDown={ e=> {
                    if (e.key === "Enter") {
                        setIsFocused(false);
                        setTemplateEditingMode(false);
                        setCurrentFilterValue("")
                    }
                  }
                }
                />
              </Tooltip>
            </GridItem>
            <GridItem>
              <Menu>
                <MenuButton
                  size="sm"
                  as={Button}
                  leftIcon={<GrActions />}
                  ml={3}
                  // mt={2}
                  pl={3}
                  pr={1}
                  borderWidth={1}
                  borderColor={"black"}
                ></MenuButton>
                <MenuList minW="20px">
                  <MenuItem>
                    <Button
                      leftIcon={<MdDriveFileRenameOutline />}
                      width="30px"
                      height="30px"
                      // ml={3}
                      // mt={2}
                      pl={3}
                      pr={1}
                      borderWidth={1}
                      borderColor={"black"}
                      onClick={() => {
                        props.editTemplateBtnHandler(selectedTemplateValue);
                        setTemplateEditingMode(true);
                        setCurrentFilterValue(props.templates.filter(item => item.id == selectedTemplateValue)[0].name);
                        setTooltipInfo("Please rename value");
                        setIsFocused(true);
                        console.log(selectedTemplateValue);
                      }
                    }
                    />
                  </MenuItem>
                  <MenuItem>
                    <Button
                      leftIcon={<MdOutlineDeleteOutline />}
                      width="30px"
                      height="30px"
                      // ml={3}
                      // mt={2}
                      pl={3}
                      pr={1}
                      borderWidth={1}
                      borderColor={"black"}
                      onClick={() => {
                        props.removeTemplateBtnHandler(selectedTemplateValue);
                        console.log(selectedTemplateValue);
                      }}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            </GridItem>

            <GridItem display={selectingModeVisibility} colSpan={1} w={"450px"}>
              <Select
                size="sm"
                placeholder="Select template"
                borderWidth={1}
                borderColor="black"
                mt={2}
                w={"450px"}
                value={selectedTemplateValue}
                onChange={hendleSelectChange}
              >
                    {filteredTemplates.map((template) => {
                      return <option value={template.id}>{template.name}</option>;
                    })}
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
                  setTemplateInputBlockValue("");
                  setFilterVisibility("hidden");
                }}
              />
            </GridItem>
            <GridItem display={additionModeVisibility} colSpan={1} w={"450px"}>
              <Input
                size="sm"
                borderWidth={1}
                borderColor="black"
                mt={2}
                value={templateInputValue}
                onChange={(e) => setTemplateInputBlockValue(e.target.value)}
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
                  setFilterVisibility("visible");
                  props.addTemplateBtnHandler(templateInputValue);
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