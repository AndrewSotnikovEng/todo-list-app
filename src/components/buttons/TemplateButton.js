import React, {  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button  } from "@chakra-ui/button"
import "react-icons/fa";
import { HiTemplate } from 'react-icons/hi';

function TemplateButton(props) {
    return (
      <Button
        onClick={ () => { 
            props.taskTemplateVisibilityHandler(true) 
        }
        } 
        w={"120px"}
        leftIcon={<HiTemplate />}
        colorScheme="teal"
        variant="outline"
      >
        Templates
      </Button>
    );
}

export default TemplateButton