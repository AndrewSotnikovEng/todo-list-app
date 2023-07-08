import "./App.css";
import axios from "axios";
import TaskItem from "./components/task-item/TaskItem";
import Panel from "./components/panel/Panel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import TaskDetails from "./components/task-details/TaskDetails";
import { SimpleGrid, Box } from '@chakra-ui/react'
import TaskTemplate from "./components/task-template/TaskTemplate";

function App() {

  const templatesObj = [
    { key:0, name: "Do push-ups" },
    { key:1, name: "Run for a 100 meters" }
  ];

  // const tasksObj = [
  //   { id: 1, name: "First Task", isTemplate:"false", state:"active", description: "First active task desc", priority: "High" },
  //   { id: 2, name: "Second Task", isTemplate:"false", state:"active", description: "Second active task desc", priority: "Low" },
  //   { id: 3, name: "Third Task", isTemplate:"false", state:"active", description: "Third active task desc", priority: "Low" },
  //   { id: 1901, name: "Fourth Task", isTemplate:"false", state:"backlog", description: "First backlog task desc", priority: "Low" },
  //   { id: 1902, name: "Fifth Task", isTemplate:"false", state:"backlog", description: "Second backlog task desc", priority: "Low" }
  // ];

  const [tableState, setTableState] = useState("active");
  const [show, setShow] = useState(false);
  const [showTaskTemplate, setShowTaskTemplate] = useState(false)
  const [taskDetailsId, setTaskDetailsId] = useState(0); 
  const [taskDetailsName, setTaskDetailsName] = useState("Initial task");
  const [taskDetailsPriority, setTaskDetailsPriority] = useState("Low");
  const [taskDetailsDescription, setTaskDetailsDescription] = useState("");
  const [taskDetailsState, setTaskDetailsState] = useState("")
  const [taskDetailsMode, setTaskDetailsMode] = useState("Adding");
  const [tasks, setTasks] = useState([])
  React.useEffect(() => {
    axios.get("http://localhost:3333/tasks").then((response) => {
      console.log("Response data: " + response.data);
      setTasks(response.data);
    });
  }, []);


  function updateTask(task) {
    axios
      .put(`http://localhost:3333/tasks/${task.id}`, {
        id: task.id,
        name: task.name,
        isTemplate: task.isTemplate,
        state: task.state,
        description: task.description,
        priority: task.priority
      })
      // .then((response) => {
      //   setTasks(response.data);
      // });
  }
 
  function deleteTask(id) {
    axios
      .delete(`http://localhost:3333/tasks/${id}`)
      .then(() => {
        alert("Task deleted!");
      });

      setCurrentTasks(tasks);
  }

  function createTask(task) {
    axios
      .post(`http://localhost:3333/tasks`, {
        id: task.id,
        name: task.name,
        isTemplate: task.isTemplate,
        state: task.state,
        description: task.description,
        priority: task.priority
      })
  }


  const [currentTasks, setCurrentTasks] = useState([])
  React.useEffect(() => {
    setCurrentTasks(tasks)
  }, [tasks]);

  const [templates, setTemplates] = useState(templatesObj)


  function resetDetailWindow() {
    setTaskDetailsName("...Please type here your title...")
    setTaskDetailsPriority("Low")
    setTaskDetailsDescription("")
    setTaskDetailsState("")
  }

  function removeTaskHandler(id) {
    // const modifiedTasks = tasks.filter(li => li.id !== id)
    // setTasks(modifiedTasks)
    deleteTask(id);
    const modifiedTasks = tasks.filter(li => li.id !== id)
    setTasks(modifiedTasks)
    updateStateHandler()
  }

  function updateStateHandler() {
    if (tableState == "active") {
      setCurrentTasks( tasks.filter( elem => elem.state == "backlog"))
    } else if ((tableState == "backlog")) {
      setCurrentTasks( tasks.filter( elem => elem.state == "active"))
    }
  }

  function taskDetailsOnChangeNotifier() {
    if (taskDetailsMode == "Editing") {
      const modifiedTasks = tasks.map((li) => {
        if (li.id == taskDetailsId) {
          li.name = taskDetailsName;
          li.priority = taskDetailsPriority;
          li.description = taskDetailsDescription;
          updateTask(li);
        }
      });
      resetDetailWindow();
    } else if (taskDetailsMode == "Adding") {              
      const newId = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1;
      setTaskDetailsId(newId);
      var modifiedTasks = tasks;
      var task = {
        id: newId,
        name: taskDetailsName,
        isTemplate: false,
        state: taskDetailsState,
        description: taskDetailsDescription,
        priority: taskDetailsPriority,
      }
      modifiedTasks.push(task);
      createTask(task);
      setTasks(modifiedTasks);
      resetDetailWindow();
    }
  }

  function addTemplateBtnHandler(templateName) {
    if (templateName == "" || templateName == null) {
      console.log("Received empty string");
      return
    }
    var tmpArray = templates
    var key;
    if(templates.length > 0) {
      key = templates[templates.length - 1].id + 1 
    }
    tmpArray.push({ "id": key, "name": templateName })
    setTemplates(tmpArray)
    console.log(templates)
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
          {currentTasks.map(({ id, name, state, priority, description }) => {
            return (
              <Box>
                <TaskItem
                  taskDetailsVisibilityHandler={setShow}
                  isShown={show}
                  taskDetailsMode={setTaskDetailsMode}
                  taskDetailsStateHandler={setTaskDetailsState}
                  taskDetailsIdHandler={setTaskDetailsId}
                  taskDetailsNameHandler={setTaskDetailsName}
                  taskDetailsPriorityHandler={setTaskDetailsPriority}
                  taskDetailsDescriptionHandler={setTaskDetailsDescription}
                  id={id}
                  name={name}
                  state={state}
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
          taskState={taskDetailsState}
          taskPriority={taskDetailsPriority}
          taskDescription={taskDetailsDescription}
          taskDetailsNameHandler={setTaskDetailsName}
          taskDetailsStateHandler={setTaskDetailsState}
          taskDetailsPriorityHandler={setTaskDetailsPriority}
          taskDetailsDescriptionHandler={setTaskDetailsDescription}
          taskDetailsOnChangeNotifier={taskDetailsOnChangeNotifier}
        />
        <TaskTemplate
          show={showTaskTemplate}
          taskTemplateVisibilityHandler={setShowTaskTemplate}
          templates={templates}
          addTemplateBtnHandler={addTemplateBtnHandler}
        />
      </div>
    </div>
  );
}

export default App;
