import { useTasks } from "../context/TaskContext";
import { SortByOption } from "../hooks/useSort";
import "./selectInput.css";

const SelectInput = () => {
  //get the sort by and setSortby from TaskContext
  const { setSortBy, sortBy } = useTasks();

  return (
    <div className="select-container">
      <select
        className="select-input"
        // default value --"input"
        value={sortBy}
        //in case of change,setSortBy to that value
        onChange={(e) => setSortBy(e.target.value as SortByOption)}
      >
        <option value="input">Sort By input order</option>
        <option value="completed">Sort by Completed</option>
        <option value="priority">Sort By priority</option>
      </select>
      <span className="select-arrow">&#x25BC;</span>
    </div>
  );
};

export default SelectInput;
