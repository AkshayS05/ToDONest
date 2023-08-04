import { useTasks } from "../../context/TaskContext";
import TaskDeletion from "../taskDeletion/TaskDeletion";

import "./footerStats.css";

const FooterStats = () => {
  //getting tasks from the TaskContext
  const { tasks, username } = useTasks();
  //to get the total number of tasks
  const totalTasks = tasks.length;
  //if total tasks are 0, then simply return the below message
  if (!totalTasks) {
    return (
      <p className="progressMessage">
        Hey {username}, you have no tasks to do at the moment!{" "}
        <em>Start adding tasks to keep a track.</em>
      </p>
    );
  }
  //if there are tasks, find the completed tasks
  const completedTasks = tasks.filter((tasks) => tasks.status).length;
  //display percentage of tasks completion
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  return (
    <>
      <TaskDeletion />
      <em>
        {/* in case all the tasks are completed */}
        {percentage === 100
          ? "You have completed all the tasks! Well done! 💪"
          : // if some of the tasks are completed
            `You have ${totalTasks} tasks in your list and ${
              totalTasks > 0
                ? `you have already completed ${completedTasks} tasks ✌`
                : ""
            } - ${percentage}%`}
      </em>
    </>
  );
};

export default FooterStats;
