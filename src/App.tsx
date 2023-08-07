import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "./App.css";
import Taskdetails from "./pages/taskDetails/Taskdetails";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import Username from "./pages/user/Username";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/task-details/:taskId" element={<Taskdetails />} />
        <Route path="/task-list" element={<TaskListPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
