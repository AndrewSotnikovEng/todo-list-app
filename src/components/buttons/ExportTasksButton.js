import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-icons/fa";

function ExportTasksButton() {
  function readFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContents = e.target.result;
        // console.log("File contents:", fileContents);
        
        const validateJSON = (json) => {
          var result = true;
          try {
            JSON.parse(json);
          } catch (e) {
            //Error
            //JSON is not okay
            return result = false;
          }
          return result
        };
        if (validateJSON(fileContents) == true) {
          alert("JSON Loaded!")
        } else {
          alert ("Ivalid JSON!")
        }
      };

      reader.readAsText(file); 
    }
  }

  return (
    <input type="file" className="form-control" style={{ width: '250px' }} onChange={readFile} />
  );
}

export default ExportTasksButton;