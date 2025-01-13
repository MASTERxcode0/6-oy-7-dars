import axios from "axios";
import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
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
    const user = { username, email, password };
    setLoading(true);

    axios
      .post("https://auth-rg69.onrender.com/api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        if (response.data.message === "User registered successfully!") {
          navigate("/login");
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
          type="text"
          name="email"
          placeholder="Email"
          value={email}
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
          {Loading ? "loading" : "register"}
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Register;
