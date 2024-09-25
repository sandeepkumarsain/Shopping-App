import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyCSqPYOwq3mnBfY9tAOxwWIEvcIPIntcgw",
    authDomain: "shopping-app-a5301.firebaseapp.com",
    projectId: "shopping-app-a5301",
    storageBucket: "shopping-app-a5301.appspot.com",
    messagingSenderId: "122631527540",
    appId: "1:122631527540:web:8c2f5f314aec55c26b8521",
    databaseURL: "https://shopping-app-a5301-default-rtdb.firebaseio.com/",
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Logged in successfully!");
        navigate("/home");
      })
      .catch((error) => {
        setErrorMessage("Invalid email or password.");
        console.error("Login error:", error.message);
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <h2>Login</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div style={{ color: "red" }}>{errorMessage}</div>

        <button type="submit">Login</button>
      </form>

      <div>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
