import "./App.css";
import TaskItem from "./components/task-item/TaskItem";
import Panel from "./components/panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import TaskDetails from "./components/task-details/TaskDetails";

function App() {
  const [tableState, setTableState] = useState("initial");
  const [show, setShow] = useState(false);
  const [taskDetailsTitle, setTaskDetailsTitle] = useState("Initial task");

  var tasks = [
    { id: 1, name: "First Task", desc: "First task desc", priority: "High" },
    { id: 2, name: "Second Task", desc: "Second task desc", priority: "Low" },
    { id: 3, name: "Third Task", desc: "Third task desc", priority: "Low" },
  ];

  return (
    <div>
      <div>
        <Panel changeTableState={(state) => setTableState(state)} />
        {tasks.map(({ id, name, desc, priority }) => {
          return (
            <TaskItem
              handler={setShow}
              isShown={show}
              currentTitle={(title) => setTaskDetailsTitle(title)}
              id={id}
              name={name}
              priority={priority}
            />
          );
        })}
        <p style={{ margin: 20 }}>Current state is: {tableState}</p>
        <TaskDetails
          show={show}
          handler={setShow}
          taskHeader={taskDetailsTitle}
          taskHeaderHandler={(title) => setTaskDetailsTitle(title)}
        />
      </div>
    </div>
  );
}

export default App;
