import "./searchTask.css";
import { useTasks } from "../../context/TaskContext";
import React from "react";

const SearchTask = () => {
  //get tasks list, searchquery state, setQuery and addTask from TaskContext
  const { tasks, searchQuery, setSearchQuery, addTask } = useTasks();
  const timeoutRef = React.useRef<number | null>(null);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear the previous timeout to avoid triggering multiple searches
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update the search query after a certain delay
    timeoutRef.current = window.setTimeout(() => {
      // Perform the actual search here or any other action needed
      // For now, we are not doing anything here since we update the search query above.
    }, 500); // Change the delay as per your requirement (e.g., 500ms)
  };
  //if form is open, don't do anything.
  if (addTask) {
    return null;
  }
  return (
    <div className="searchBarContainer">
      <input
        type="search"
        value={searchQuery}
        // on change of the input, if user types set the query to that value
        onChange={(e) => handleQuery(e)}
        placeholder={
          tasks.length > 0
            ? "Search tasks..."
            : "Add Task to start searching..."
        }
      />
      {tasks.length === 0 && (
        <p className="noTasksMessage">Sorry, no such tasks found.</p>
      )}
    </div>
  );
};

export default SearchTask;
