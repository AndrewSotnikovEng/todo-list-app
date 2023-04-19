import './App.css';
import TaskItem from './TaskItem';
import Panel from "./Panel"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";

function App() {

  const [tableState, setTableState] = useState("initial")

  return (
    <div>
      <div>
          <Panel changeTableState= { state => setTableState(state) }/>
          <TaskItem id="1" name="First Task" priority="High"/>
          <TaskItem id="2" name="Second Task" priority="Low"/>
          <p style={{margin: 20}} >Current state is: { tableState }</p>
      </div>
  </div>

  );
}

export default App;
