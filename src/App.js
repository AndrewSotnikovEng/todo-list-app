import "./App.css";
import TaskItem from "./components/task-item/TaskItem";
import Panel from "./components/panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import TaskDetails from "./components/task-details/TaskDetails";
import { SimpleGrid, Box } from '@chakra-ui/react'
import TaskTemplate from "./components/task-template/TaskTemplate";

function App() {

  const templatesObj = [
    { name: "Do push-ups" },
    { name: "Run for a 100 meters" }
  ];

  const tasksObj = [
    { id: 1, name: "First Task", isTemplate:"false", state:"active", description: "First active task desc", priority: "High" },
    { id: 2, name: "Second Task", isTemplate:"false", state:"active", description: "Second active task desc", priority: "Low" },
    { id: 3, name: "Third Task", isTemplate:"false", state:"active", description: "Third active task desc", priority: "Low" },
    { id: 1901, name: "Fourth Task", isTemplate:"false", state:"backlog", description: "First backlog task desc", priority: "Low" },
    { id: 1902, name: "Fifth Task", isTemplate:"false", state:"backlog", description: "Second backlog task desc", priority: "Low" }
  ];

  const [tableState, setTableState] = useState("initial");
  const [show, setShow] = useState(false);
  const [showTaskTemplate, setShowTaskTemplate] = useState(false)
  const [taskDetailsId, setTaskDetailsId] = useState(0); 
  const [taskDetailsName, setTaskDetailsName] = useState("Initial task");
  const [taskDetailsPriority, setTaskDetailsPriority] = useState("Low");
  const [taskDetailsDescription, setTaskDetailsDescription] = useState("");
  const [taskDetailsMode, setTaskDetailsMode] = useState("Adding");
  const [tasks, setTasks] = useState(tasksObj)

  function resetDetailWindow() {
    setTaskDetailsName("...Please type here your title...")
    setTaskDetailsPriority("Low")
    setTaskDetailsDescription("")
  }

  function removeTaskHandler(id) {
    const modifiedTasks = tasks.filter(li => li.id !== id)
    setTasks(modifiedTasks)
  }

  function updateStateHandler() {
    if (tableState == "active") {
      setTasks( tasksObj.filter( elem => elem.state == "backlog"))
    } else if ((tableState == "backlog")) {
      setTasks( tasksObj.filter( elem => elem.state == "active"))
    }
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
          updateStateHandler={updateStateHandler}
          taskDetailsVisibilityHandler={setShow}
          taskTemplateVisibilityHandler={setShowTaskTemplate}
          taskDetailsModeHandler={setTaskDetailsMode}
        />
        <SimpleGrid minChildWidth="370px" spacing="10px">
          {tasks.map(({ id, name, priority, description }) => {
            return (
              <Box>
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
              </Box>
            );
          })}
        </SimpleGrid>
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
        <TaskTemplate
          show={showTaskTemplate}
          taskTemplateVisibilityHandler={setShowTaskTemplate}
        />
      </div>
    </div>
  );
}

export default App;
