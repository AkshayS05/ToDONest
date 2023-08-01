import { useTasks } from "../../context/TaskContext";

import SelectInput from "../selectInput/SelectInput";
import Button from "../../ui/Button";
// styles
import "./taskDeletion.css";

const TaskDeletion = () => {
  // get required methods from the Task context
  const { onCompletedTasksDeletion, onDeleteAll } = useTasks();

  return (
    <>
      <div className="footer_items">
        <div className="actions">
          {/* reusable select input */}
          <SelectInput />
        </div>
        <div className="footer_buttons">
          {/* button to delete completed tasks */}
          <Button type="primary" onClick={() => onCompletedTasksDeletion()}>
            Clear Completed Tasks
          </Button>
          {/* button to delete all the tasks */}
          <Button type="primary" onClick={() => onDeleteAll()}>
            Clear List
          </Button>
        </div>
      </div>
    </>
  );
};

export default TaskDeletion;
