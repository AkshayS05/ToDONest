import "./searchTask.css";
import { useTasks } from "../../context/TaskContext";

const SearchTask = () => {
  //get tasks list, searchquery state, setQuery and addTask from TaskContext
  const { tasks, searchQuery, setSearchQuery, addTask } = useTasks();

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
        type="search"
        value={searchQuery}
        // on change of the input, if user types set the query to that value
        onChange={(e) => handleQuery(e)}
        placeholder={
          tasks.length > 0
            ? "Search tasks..."
            : "Add Task to start searching..."
        }
        disabled={tasks.length === 0}
      />
    </div>
  );
};

export default SearchTask;
