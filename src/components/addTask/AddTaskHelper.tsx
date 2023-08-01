import { useTasks } from "../../context/TaskContext";
import AddTask from "./AddTask";

const AddTaskHelper = () => {
  const { editTask, onUpdate, onAdd, addTask, onNewTask } = useTasks();

  return editTask ? (
    <AddTask
      onAdd={onUpdate}
      task={editTask}
      addTask={addTask}
      onNewTask={onNewTask}
    />
  ) : (
    <AddTask onAdd={onAdd} addTask={addTask} onNewTask={onNewTask} />
  );
};

export default AddTaskHelper;
