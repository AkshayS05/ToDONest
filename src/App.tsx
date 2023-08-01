import AddTaskHelper from "./components/addTask/AddTaskHelper";
import AppHeading from "./components/appHeading/AppHeading";
import SearchTask from "./components/searchTask/SearchTask";
import { useTasks } from "./context/TaskContext";
import UseWeekDayGreets from "./hooks/useWeekdayGreet";
import Button from "./ui/Button";

// styles
import "./App.css";
import TaskList from "./components/taskList/TaskList";
import FooterStats from "./components/footerStats/FooterStats";

function App() {
  const { onNewTask } = useTasks();
  const { greet } = UseWeekDayGreets();
  return (
    <div>
      <div>
        <AppHeading>ToDo Nest ✍</AppHeading>
        <SearchTask />
        <span className="header_items">
          <p className="weekday">{greet}</p>
          <Button type="add_task_btn" onClick={onNewTask}>
            Add Task
          </Button>
        </span>
      </div>
      <AddTaskHelper />
      <TaskList />
      <footer className="footer">
        <FooterStats />
      </footer>
    </div>
  );
}

export default App;
