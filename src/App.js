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

    axios.get("http://localhost:3333/templates").then((response) => {
      console.log("Templates data: " + response.data);
      setTemplates(response.data);
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

  function createTemplate(template) {
    axios
      .post(`http://localhost:3333/templates`, {
        id: template.id,
        name: template.name,
      })
    var tmpTemplates = templates
    tmpTemplates.push(template)
    setTemplates(tmpTemplates)
  }

  function deleteTemplate(id) {
    var id = templates.filter( template => template.id == id)[0].id
    axios
      .delete(`http://localhost:3333/templates/${id}`)
      .then(() => {
        alert("Template deleted!");
      });
      
      var tmpTemplates = templates.filter(template => template.id != id)
      setTemplates(tmpTemplates);
  }

  function editTemplate(id, newName) {
    var filterInput = document.getElementById("filter-template-input")
    
    axios
      .put(`http://localhost:3333/templates/${id}`, {
        "id": id,
        "name": newName
      })

      var tmpTemplates = templates;
      tmpTemplates.map( template => {
        if (template.id == id) {
          template.name = newName
        }
      })

      setTemplates(tmpTemplates)
    filterInput.focus();
    // filterInput.scrollIntoView();
  }

  const [currentTasks, setCurrentTasks] = useState([])
  React.useEffect(() => {
    setCurrentTasks(tasks)
  }, [tasks]);

  const [templates, setTemplates] = useState([])

  function resetDetailWindow() {
    setTaskDetailsName("...Please type here your title...");
    setTaskDetailsPriority("Low");
    setTaskDetailsDescription("");
    setTaskDetailsState("");
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
    var id;
    if(templates.length > 0) {
      id = templates[templates.length - 1].id + 1 
    } else {
      id = 1
    }
    var template = { id: id, name: templateName }
    createTemplate(template)
    setTemplates(tmpArray)
    console.log(templates)
  }

  function removeTemplateBtnHandler(id) {
    deleteTemplate(id)
  }


  function editTemplateBtnHandler(id, newName) {
    editTemplate(id, newName)
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
          removeTemplateBtnHandler={removeTemplateBtnHandler}
          editTemplateBtnHandler={editTemplateBtnHandler}
        />
      </div>
    </div>
  );
}

export default App;
