import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import TaskItems from "../../model/task";
import { v4 as getId } from "uuid";
import "./addTask.css";

interface AddTaskProps {
  onAdd: (task: TaskItems) => void;
  task?: TaskItems;
  addTask: boolean;
  onNewTask: () => void;
}

const AddTask = ({ task, onAdd, addTask, onNewTask }: AddTaskProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const priorityRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (nameRef.current !== null && nameRef.current.value.length > 3) {
      setDisabled(false);
    }
    if (task) {
      setEdit(true);
      setDisabled(false);
    }
    if (
      task &&
      nameRef.current !== null &&
      statusRef.current !== null &&
      priorityRef.current !== null
    ) {
      nameRef.current.value = task.task;
      statusRef.current.value = String(task.status);
      priorityRef.current.checked = task.priority;
    }
  }, [task, disabled, edit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTask: TaskItems = {
      id: task ? task.id : getId(),
      index: task ? task.index : 0,
      task: nameRef.current?.value || "",
      status: statusRef.current?.value === "true" ? true : false,
      priority: priorityRef.current?.checked ? true : false,
    };

    !disabled && onAdd(newTask);
    if (edit) {
      onNewTask();
    }
  };
  const handleInputChange = () => {
    if (nameRef.current !== null && nameRef.current.value.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <>
      {addTask && (
        <div className="modal-overlay">
          <div className="modal">
            <form className="form form_visible" onSubmit={handleSubmit}>
              <div className="form_column">
                <label htmlFor="title">Task</label>
                <input
                  type="text"
                  id="title"
                  ref={nameRef}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_column">
                <label htmlFor="status">Select status</label>
                <select id="status" ref={statusRef}>
                  <option value="false">Incomplete</option>
                  <option value="true">Completed</option>
                </select>
              </div>
              <div className="form_column">
                <label htmlFor="priority">Add to priority</label>
                <input
                  type="checkbox"
                  value="priority"
                  id="priority"
                  ref={priorityRef}
                />
              </div>
              <div>
                <Button type="primary" disabled={disabled}>
                  Add
                </Button>
                <Button type="secondary" onClick={onNewTask}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
