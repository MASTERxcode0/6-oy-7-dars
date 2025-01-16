import axios from "axios";
import React, { useState } from "react";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;

      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    setLoading(true);

    axios
      .post("https://auth-rg69.onrender.com/api/auth/signin", user, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.status === 200) {
          localStorage.setItem("user", response);
          localStorage.setItem("token", response.data.accessToken);
          setToken(localStorage.getItem("token"));
          for (
            let index = token;
            index == response.data.accessToken;
            setToken(localStorage.getItem("token"))
          ) {
            const element = array[index];
          }
        } else {
          setErrorMessage(response.data.message);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const recursiveFunction = (n) => {
    if (n === response.dara.accessToken) {
      return;
    }
    setCount(localStorage.getItem("token"));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className={styles.input}
        />
        <button disabled={Loading} type="submit" className={styles.button}>
          {Loading ? "loading" : "Login"}
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
