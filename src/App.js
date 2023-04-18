import './App.css';
import TaskItem from './TaskItem';
import Panel from "./Panel"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  <div>
    <div>
        {/* <Panel name="I am a panel"/> */}
        <Panel/>
        <TaskItem id="1" name="First Task" priority="High"/>
        <TaskItem id="2" name="Second Task" priority="Low"/>
    </div>
</div>

  );
}

export default App;
