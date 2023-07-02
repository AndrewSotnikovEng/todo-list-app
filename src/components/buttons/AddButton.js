import React, {  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { AiFillPlusCircle } from 'react-icons/ai';

function AddButton(props) {
    return (
    <Button w={20} onClick={ () => { 
        props.taskDetailsVisibilityHandler(true)
        props.taskDetailsModeHandler("Adding")
        } } leftIcon={<AiFillPlusCircle />} colorScheme='teal' variant='outline'>
        Add
    </Button>
    )
}

export default AddButton