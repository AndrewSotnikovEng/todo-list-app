import React, {  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { MdTableRestaurant } from 'react-icons/md';
import { FaBox } from 'react-icons/fa';

function ToggleStateButton(props) {
    return (
    <Button onClick={ props.toggleButtonView } 
    w={"120px"}
    leftIcon={ props.buttonName == "active" ?  <MdTableRestaurant /> : <FaBox />} 
    colorScheme='teal' variant='outline'>
        { props.buttonName }
    </Button>
    )
}

export default ToggleStateButton