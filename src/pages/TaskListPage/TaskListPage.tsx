import AddTaskHelper from "../../components/addTask/AddTaskHelper";
import AppHeading from "../../components/appHeading/AppHeading";
import SearchTask from "../../components/searchTask/SearchTask";
import Button from "../../ui/Button";
import TaskList from "../../components/taskList/TaskList";
import FooterStats from "../../components/footerStats/FooterStats";
import UseWeekDayGreets from "../../hooks/useWeekdayGreet";
import { useTasks } from "../../context/TaskContext";
import "./taskListPage.css";

const TaskListPage = () => {
  const { onNewTask } = useTasks();
  const { greet } = UseWeekDayGreets();
  return (
    <>
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
      <div className="app_body">
        <AddTaskHelper />
        <TaskList />
      </div>
      <footer className="footer">
        <FooterStats />
      </footer>
    </>
  );
};

export default TaskListPage;
