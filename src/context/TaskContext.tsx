import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import TaskItems from "../model/task";
import useSort, { SortByOption } from "../hooks/useSort";

type TaskContextValue = {
  tasks: TaskItems[];
  onAdd: (newTask: TaskItems) => void;
  addTask: boolean;
  onNewTask: () => void;
  onClick: () => void;
  onDelete: (id: string) => void;
  onEdit: (task: TaskItems) => void;
  onUpdate: (task: TaskItems) => void;
  onDeleteAll: () => void;
  handleFindTaskByid: (id: string) => TaskItems | undefined;
  onToggle: (id: string) => void;
  onCompletedTasksDeletion: () => void;
  handleUsernameSubmit: (username: string) => void;
  username: string;
  setUsername: (username: string) => void;
  editTask: TaskItems | null;
  searchedTasks: TaskItems[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sortBy: SortByOption;
  setSortBy: (sortBy: SortByOption) => void;
};
type TaskProviderProps = {
  children: ReactNode;
};
const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  onAdd: () => {},
  addTask: false,
  onNewTask: () => {},
  onClick: () => {},
  onEdit: () => {},
  onDelete: () => {},
  onDeleteAll: () => {},
  handleFindTaskByid: () => undefined,
  onToggle: () => {},
  onCompletedTasksDeletion: () => {},
  handleUsernameSubmit: () => {},
  onUpdate: () => {},
  searchedTasks: [],
  username: "",
  setUsername: () => {},
  editTask: null,
  searchQuery: "",
  setSearchQuery: () => {},
  sortBy: "input",
  setSortBy: () => {},
});

function TaskProvider({ children }: TaskProviderProps) {
  //passing initial value to sort hook
  const [sortBy, setSortBy] = useState<SortByOption>("input");

  //to decide if to show the form or hide it depending upon the user has clicked the Add Task button or not.
  const [addTask, setAddTask] = useState<boolean>(false);
  //state to edit the task which accepts the TaskItems type or a null as an initial value
  const [editTask, setEditTask] = useState<TaskItems | null>(null);
  //if user search for a particular task from the list query will be set to that input else it is empty string to start with.
  const [searchQuery, setSearchQuery] = useState("");

  //fetch the tasks from the localstorage stored in myTasks if any, else an empty array (initial state)
  const [tasks, setTasks] = useLocalStorageState<TaskItems[]>({
    initialState: [],
    key: "myTasks",
  });
  //to access username
  const [username, setUsername] = useLocalStorageState<string>({
    initialState: "",
    key: "username",
  });
  //add username to the localstorage
  const handleUsernameSubmit = (username: string) => {
    if (username) {
      setUsername(username);
    }
  };
  // search task

  // if there is any search in the input, we will try to find the task from the list, if there is no search query then the tasks will be shown as they are.

  const searchedTasks = useMemo(() => {
    return searchQuery.length > 0
      ? tasks.filter((task) =>
          task.task.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : tasks;
  }, [tasks, searchQuery]);
  // to get the sorted tasks if user has selected any sort type else the initial state of sort by "input" will be used.
  const { sortedTasks } = useSort({ searchedTasks, sortBy });

  const handleAdd = (newTask: TaskItems) => {
    if (newTask.task.length === 0) return;
    const newIndex = tasks.length + 1;
    // to add a new task on the top of the list and then the exisitng tasks.
    const newTaskWithIndex = { ...newTask, index: newIndex };
    setTasks([newTaskWithIndex, ...tasks]);
    //ones the task is added, close the form.
    setAddTask(false);
  };
  const handleFindTaskByid = (id: string) => {
    return tasks.find((task) => task.id === id);
  };
  const handleNewTask = () => {
    // to toggle if user is in the add task form or not.
    setAddTask(!addTask);
  };
  const handleDelete = (id: string) => {
    //in case of delete, mfind teh id of the task and filter it out from the task list
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEdit = (task: TaskItems) => {
    //if edit button is clicked, open the form and send the task values
    setAddTask(!addTask);
    setEditTask(task);
  };
  const handleUpdate = (updatedTask: TaskItems) => {
    //update the task after finding it from the task list
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    //make the edi task state  null again after the operation
    setEditTask(null);
    //if form is open close it or vice versa.
    setAddTask(!addTask);
  };
  const handleToggle = (id: string) => {
    //find the task
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      );
    });
  };
  const handleDeleteAll = () => {
    //if user clicked on deleting all the tasks from the list, confirm it and make the task list empty.
    const confirmed = window.confirm(
      "Are you sure, you want to delete all the tasks?"
    );
    confirmed && setTasks([]);
  };
  const handleCompletedTasksDeletion = () => {
    //if user wants to delete the completed tasks from the list, filter them out.Where status is incomplete, will stay in the list
    setTasks((tasks) => tasks.filter((task) => !task.status));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        onAdd: handleAdd,
        addTask,
        onNewTask: handleNewTask,
        editTask,
        onClick: handleNewTask,
        onToggle: handleToggle,
        username,
        setUsername,
        onEdit: handleEdit,
        onUpdate: handleUpdate,
        onDelete: handleDelete,
        onDeleteAll: handleDeleteAll,
        handleUsernameSubmit,
        handleFindTaskByid,
        onCompletedTasksDeletion: handleCompletedTasksDeletion,
        searchedTasks,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
function useTasks() {
  //we can directly access all the methods using this hook from other components.
  const context = useContext(TaskContext);
  return context;
}
export { TaskProvider, TaskContext, useTasks };
