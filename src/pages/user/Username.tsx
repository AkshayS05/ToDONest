import { FormEvent, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import "./username.css";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

const Username = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { handleUsernameSubmit, username } = useTasks();

  useEffect(() => {
    if (username) {
      navigate("/task-list");
    } else if (username === "") {
      navigate("/");
    }
  }, [username, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = userNameRef?.current?.value;
    if (username) {
      handleUsernameSubmit(username);
    }
    navigate("/task-list");
  };

  return (
    <section className="home_components">
      <h1 className="welcome_heading">Welcome to ToDo Nest✍</h1>
      <form onSubmit={handleSubmit} className="username_form">
        <label htmlFor="username">Please enter your Name:</label>
        <input type="text" id="username" ref={userNameRef} />
        <Button type="primary">Submit</Button>
      </form>
    </section>
  );
};

export default Username;
