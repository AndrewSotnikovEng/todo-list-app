import React from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import { BiShare, BiChat, BiLike } from "react-icons/bi";
import "react-icons/fa";
import { Text, Card, CardBody, CardFooter, HStack } from '@chakra-ui/react'

function TaskItem(props) {

    // const backgroundColor = () => {
    //     var basicClass = "border border-dark block-div"
    //     if(props.priority == "High") {
    //         console.log("high");
    //         return basicClass + " high-priority"
    //     } else if (props.priority == "Low") {
    //         console.log("low");
    //         return basicClass + " low-priority"
    //     } else {
    //         return basicClass;
    //     }
    // }

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

    // const backgroundColor = "border border-dark block-div";
    return (

            <Card maxW='350px'
            m='20px'
            border='1px'
            borderColor='aqua'
            backgroundColor={ backgroundColor }
            >
            {/* <CardHeader>
                <Flex spacing='4'>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    // icon={<BsThreeDotsVertical /> }
                />
                </Flex>
            </CardHeader> */}
            <CardBody ml='5px'>
                <Text fontWeight='bold' align='left'>
                    {props.name}
                </Text>
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

    // <div className={backgroundColor()}>
    //     <div>
    //         <div>ID: props.ID </div>    
    //         <div className="state-buttons-block">
    //             <div className="state-button">
    //                 <i className="fa fa-calendar-o"></i>
    //             </div>
    //             <div className="state-button">
    //                 <i className="fa fa-archive"></i>
    //             </div>
    //             <div className="state-button">
    //                 <i className="fa fa-trash" />
    //             </div> 
    //             <div className="state-button">
    //                 <i className="fa fa-check"></i> 
    //             </div>
    //             </div>
    //     </div>
    //     <p>
    //         Name: {props.name} 
    //     </p>
    //     <p>
    //         Priority: {props.priority} 
    //     </p>    
    // </div>
    )
}

export default TaskItem;