import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import PageNotFound from "../pageNotFound/PageNotFound";
// styles
import "./taskDetails.css";
import Button from "../../ui/Button";
const Taskdetails = () => {
  const { taskId } = useParams<string>();
  const { handleFindTaskByid, username } = useTasks();
  //navigate back
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  if (!taskId) {
    return <PageNotFound />;
  }
  const task = handleFindTaskByid(taskId);
  console.log(task?.index);

  if (!task) return null;

  return (
    <>
      <section className="details">
        <h1>
          {username.slice(0, 10) + "'s"} Task # {task.index}
        </h1>
        <div className="task_status">
          <p className={task.status ? "completed_task" : "incomplete"}>
            {task.status ? "Status: Completed" : "Status: Yet to Complete"}
            <p className={task.priority ? "priority_task" : ""}>
              {task.priority ? "P" : ""}
            </p>
          </p>
        </div>

        <p className="task_details">{task.task}</p>
      </section>
      <Button type="primary" onClick={handleNavigate}>
        Back
      </Button>
    </>
  );
};

export default Taskdetails;
