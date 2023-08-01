import { useTasks } from "../../context/TaskContext";
import TaskItems from "../../model/task";
import Button from "../../ui/Button";

// styles
import "./task.css";

interface Task {
  //a single task will be of type TaskItem model
  task: TaskItems;
}

const Task = ({ task }: Task) => {
  const { onEdit, onDelete, onToggle } = useTasks();
  return (
    //conditional class
    <li className={task.priority && !task.status ? "priority" : "task"}>
      <div className="task_name">
        {/* onToggle emthod to turn on and off the checkbox */}
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => onToggle(task.id)}
        />
        {/* if the task is marked as completed, then it will geta  style of cut out using line-through */}

        <span className={task.status ? "completed" : ""}>{task.task}</span>
      </div>
      <div className="list_buttons">
        {/* Button components with Edit and Delete Children */}
        <Button type="edit" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button type="delete" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default Task;
