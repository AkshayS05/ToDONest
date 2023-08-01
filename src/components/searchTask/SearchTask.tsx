import { useState, useEffect } from "react";

import "./searchTask.css";
import { useTasks } from "../../context/TaskContext";

const SearchTask = () => {
  //get tasks list, searchquery state, setQuery and addTask from TaskContext
  const { tasks, searchQuery, setSearchQuery, addTask } = useTasks();

  //hide and show search bar based on tasks are in the list or list is empty
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //searchBar will hide and becomes visible based on the length of the tasks.
    setVisible(tasks.length > 0);
  }, [tasks]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  //if form is open, don't do anything.
  if (addTask) {
    return null;
  }
  return (
    <div className="searchBarContainer">
      <input
        className={`searchBar ${visible ? "showSearchBar" : ""}`}
        type="search"
        value={searchQuery}
        // on change of the input, if user types set the query to that value
        onChange={(e) => handleQuery(e)}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default SearchTask;
