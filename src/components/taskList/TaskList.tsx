import { useTasks } from "../../context/TaskContext";
import Task from "../task/Task";
// styles
import "./taskList.css";

const TaskList = () => {
  //get the tasks list from the context hook.
  const { tasks } = useTasks();
  return (
    <div>
      <ul className="taskList">
        {/* iterate over the tasks and create a list */}
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
