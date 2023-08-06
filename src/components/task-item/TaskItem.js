import React, { useState } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, IconButton  } from "@chakra-ui/button"
import { BiShare, BiChat, BiLike } from "react-icons/bi";
import {MdDone } from "react-icons/md"
import "react-icons/fa";
import { Text, Card, CardBody, CardFooter, HStack, Flex } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { CloseButton, Spacer } from '@chakra-ui/react'


function TaskItem(props) {

        const backgroundColor = () => {
            var basicClass = "";        
            if(props.priority == "High") {
                return basicClass + "pink"
            } else if (props.priority == "Low") {
                return basicClass + "greenyellow"
            } else {
                return basicClass;
            }
        }
    const [closeState, setCloseState] = useState(false);
    const [doneState, setDoneState] = useState(false);

    return (
      <div>
        <Card
          maxW="390px"
          height="180px"
          m="20px"
          border="1px"
          borderColor="aqua"
          backgroundColor={backgroundColor}
          onClick={() => {
            if (closeState == false && doneState == false) {
              props.taskDetailsVisibilityHandler(true);
              props.taskDetailsMode("Editing");
              props.taskDetailsIdHandler(props.id);
              props.taskDetailsNameHandler(props.name);
              props.taskDetailsStateHandler(props.state);
              props.taskDetailsPriorityHandler(props.priority);
              props.taskDetailsDescriptionHandler(props.description);
            }
          }}
        >
          <VStack align={"flex-end"}>
            <CloseButton
              size="sm"
              onClick={() => {
                props.removeTaskHandler(props.id);
              }}
              onMouseOver={() => {
                setCloseState(true);
              }}
              onMouseOut={() => {
                setCloseState(false);
              }}
            />
          </VStack>
          <CardBody ml="5px" pt={0}>
            <Flex>
              <Text fontWeight="bold" width="260px">
                {props.name}
              </Text>
              <Text fontSize={14} fontWeight="bold" flex="" w="70px">
                ID: {props.id}
              </Text>
            </Flex>
          </CardBody>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            pl={"5px"}
            sx={{
              "& > button": {
                minW: "110px",
              },
            }}
          >
            <HStack>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </HStack>
            <Flex>
              <Spacer w={"100%"}/>
              <IconButton
                // colorScheme=""
                color={"black"}
                h={"20px"}
                maxW={"10px"}
                aria-label="Search database"
                icon={<MdDone />}
                onClick={() => {
                  props.markTaskAsDoneHandler(props.id);
                }}
                onMouseOver={() => {
                  setDoneState(true);
                }}
                onMouseOut={() => {
                  setDoneState(false);
                }}
              />
            </Flex>
          </CardFooter>
        </Card>
      </div>
    );
}

export default TaskItem;