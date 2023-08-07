import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import "./username.css";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

const Username = () => {
  const userNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { handleUsernameSubmit, username, setUsername } = useTasks();
  const [buttonDisabled, setButtonDisabled] = useState(username.length === 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = userNameRef?.current?.value;
    if (username && username.length >= 10) {
      handleUsernameSubmit(username);
    }
    navigate("/task-list");
  };
  useEffect(() => {
    userNameRef?.current?.focus();
    setButtonDisabled(username.length === 0);
  }, [username]);

  useEffect(() => {
    if (username !== "" && username.length >= 10) {
      navigate("/task-list");
    } else if (username === "" || !username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleChange = () => {
    const inputUsername = userNameRef.current?.value || "";
    setUsername(inputUsername);
  };
  return (
    <section className="home_components">
      <h1 className="welcome_heading">Welcome to ToDo Nest✍</h1>
      <form onSubmit={handleSubmit} className="username_form">
        <label htmlFor="username">Please enter your Name:</label>
        <input
          type="text"
          id="username"
          ref={userNameRef}
          onChange={handleChange}
        />
        <Button type="primary" disabled={buttonDisabled}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Username;
