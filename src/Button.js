import React, {  } from "react";
import "./TaskItem.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { MdTableRestaurant } from 'react-icons/md';

function CustomButton(props) {
    return (
    <Button onClick={ props.toggleButtonView } leftIcon={<MdTableRestaurant />} colorScheme='teal' variant='outline'>
        { props.buttonName }
    </Button>
    )
}

export default CustomButton