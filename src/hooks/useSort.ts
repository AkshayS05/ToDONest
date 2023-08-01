import { useState, useEffect } from "react";
import TaskItems from "../model/task";

//union type to choose for the sort
export type SortByOption = "input" | "completed" | "priority";

interface UseSortProps {
  searchedTasks: TaskItems | TaskItems[];
  sortBy: SortByOption;
}

const useSort = ({ searchedTasks, sortBy }: UseSortProps) => {
  const [sortedTasks, setSortedTasks] = useState<TaskItems[]>([]);

  useEffect(() => {
    // if there are multiple tasks
    if (Array.isArray(searchedTasks)) {
      // Handle array of tasks
      //if the selected input is "input", then set the default sort order which is "input"
      if (sortBy === "input") {
        setSortedTasks(searchedTasks);
      } else if (sortBy === "priority") {
        //if select input is "priority", create a new array of tasks with priority equals to true
        const sortedByPriority = searchedTasks
          .slice()
          // sorting in descending order
          .sort((a, b) => Number(b.priority) - Number(a.priority));
        setSortedTasks(sortedByPriority);
      } else if (sortBy === "completed") {
        const sortedByCompleted = searchedTasks
          // if select input is "completed" comapre numeric values of b and a status and provide descending order list
          .slice()
          .sort((a, b) => Number(b.status) - Number(a.status));
        setSortedTasks(sortedByCompleted);
      }
    } else {
      // Handle single task
      setSortedTasks([searchedTasks]);
    }
  }, [sortBy, searchedTasks]);

  return { sortedTasks };
};

export default useSort;
