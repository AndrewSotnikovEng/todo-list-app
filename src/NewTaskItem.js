import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function NewTaskItem() {
  
return (
<form className="border border-primary">
    <div className="form-group outline">
      <label for="exampleInputEmail1">Name</label>
      <input type="text" className="form-control" id="taskNameInput"  placeholder="Name your task"/>
    </div>
    <div className="form-group outline">
        <label for="exampleInputEmail1">Description</label>
        <input type="text" className="form-control" id="taskDescriptionInput" placeholder="Put description here"/>
    </div>
    <button type="submit" className="btn btn-primary outline">Submit</button>
  </form>
  );
  }

  export default NewTaskItem;