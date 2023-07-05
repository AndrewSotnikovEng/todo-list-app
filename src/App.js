import "./App.css";
import TaskItem from "./components/task-item/TaskItem";
import Panel from "./components/panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import TaskDetails from "./components/task-details/TaskDetails";

function App() {


  const tasksObj = [
    { id: 1, name: "First Task", description: "First task desc", priority: "High" },
    { id: 2, name: "Second Task", description: "Second task desc", priority: "Low" },
    { id: 1689, name: "Third Task", description: "Third task desc", priority: "Low" },
  ];

  const [tableState, setTableState] = useState("initial");
  const [show, setShow] = useState(false);
  const [taskDetailsId, setTaskDetailsId] = useState(0); 
  const [taskDetailsName, setTaskDetailsName] = useState("Initial task");
  const [taskDetailsPriority, setTaskDetailsPriority] = useState("Low");
  const [taskDetailsDescription, setTaskDetailsDescription] = useState("");
  const [taskDetailsMode, setTaskDetailsMode] = useState("Adding");
  const [tasks, setTasks] = useState(tasksObj)

  function resetDetailWindow() {
    console.log("New taskDetailsId: " + taskDetailsId);
    setTaskDetailsName("...Please type here your title...")
    setTaskDetailsPriority("Low")
    setTaskDetailsDescription("")
  }

  function removeTaskHandler(id) {
    const modifiedTasks = tasks.filter(li => li.id !== id)
    setTasks(modifiedTasks)
  }

  function taskDetailsOnChangeNotifier() {
    if (taskDetailsMode == "Editing") {
      const modifiedTasks = tasks.map((li) => {
        if (li.id == taskDetailsId) {
          li.name = taskDetailsName;
          li.priority = taskDetailsPriority;
          li.description = taskDetailsDescription;
        }
      });
      resetDetailWindow();
    } else if (taskDetailsMode == "Adding") {              
      const newId = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1;
      setTaskDetailsId(newId);
      var modfiedTasks = tasks;
      modfiedTasks.push({
        id: newId,
        name: taskDetailsName,
        description: taskDetailsDescription,
        priority: taskDetailsPriority,
      });
      resetDetailWindow();
    }
  }

  return (
    <div>
      <div>
        <Panel
          changeTableState={(state) => setTableState(state)}
          taskDetailsVisibilityHandler={setShow}
          taskDetailsModeHandler={setTaskDetailsMode}
        />
        {tasks.map(({ id, name, priority, description }) => {
          return (
            <TaskItem
              taskDetailsVisibilityHandler={setShow}
              isShown={show}
              taskDetailsMode={setTaskDetailsMode}
              taskDetailsIdHandler={setTaskDetailsId}
              taskDetailsNameHandler={setTaskDetailsName}
              taskDetailsPriorityHandler={setTaskDetailsPriority}
              taskDetailsDescriptionHandler={setTaskDetailsDescription}
              id={id}
              name={name}
              priority={priority}
              description={description}
              removeTaskHandler={removeTaskHandler}
            />
          );
        })}
        <p style={{ margin: 20 }}>Current state is: {tableState}</p>
        <TaskDetails
          show={show}
          taskDetailsVisibilityHandler={setShow}
          taskId={taskDetailsId}
          taskHeader={taskDetailsName}
          taskPriority={taskDetailsPriority}
          taskDescription={taskDetailsDescription}
          taskDetailsNameHandler={setTaskDetailsName}
          taskDetailsPriorityHandler={setTaskDetailsPriority}
          taskDetailsDescriptionHandler={setTaskDetailsDescription}
          taskDetailsOnChangeNotifier={taskDetailsOnChangeNotifier}
        />
      </div>
    </div>
  );
}

export default App;
