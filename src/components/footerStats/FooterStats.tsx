import { useTasks } from "../../context/TaskContext";

import "./footer.css";

const FooterStats = () => {
  const { tasks } = useTasks();
  const totalTasks = tasks.length;

  if (!totalTasks) {
    return (
      <p className="progressMessage">
        You have no tasks to do at the moment!{" "}
        <em>Start adding tasks to keep a track.</em>
      </p>
    );
  }
  const completedTasks = tasks.filter((tasks) => tasks.status).length;
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  return (
    <>
      <em>
        {percentage === 100
          ? "You have completed all the tasks! Well done!"
          : `You have ${totalTasks} tasks in your list and ${
              totalTasks > 0
                ? `you have already completed ${completedTasks} tasks`
                : ""
            } - ${percentage}%`}
      </em>
    </>
  );
};

export default FooterStats;
