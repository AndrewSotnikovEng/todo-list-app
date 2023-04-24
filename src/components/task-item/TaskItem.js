import React from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import { BiShare, BiChat, BiLike } from "react-icons/bi";
import "react-icons/fa";
import { Text, Card, CardBody, CardFooter, HStack, Flex } from '@chakra-ui/react'


function TaskItem(props) {

        const backgroundColor = () => {
        var basicClass = ""
        if(props.priority == "High") {
            return basicClass + "pink"
        } else if (props.priority == "Low") {
            return basicClass + "greenyellow"
        } else {
            return basicClass;
        }
    }

    return (
        <div>
            <Card maxW='350px'
            m='20px'
            border='1px'
            borderColor='aqua'
            backgroundColor={ backgroundColor }
            onClick={ () => {
                props.handler(true); 
                console.log("Clicked at: " +  props.name );
                props.currentTitle( props.name )
             } 
            }
            >
            {}
            <CardBody ml='5px'>
                <Flex>
                    <Text fontWeight='bold' width='260px'>
                        {props.name}
                    </Text>
                    <Text fontSize={14} fontWeight='bold' flex=''>
                       ID: {props.id}
                    </Text>
                </Flex>

            </CardBody>
            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '110px',
                },
                }}
            >
                <HStack>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                    </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                        Share
                    </Button>
                </HStack>
            </CardFooter>
            </Card>
    </div>
    )
}

export default TaskItem;