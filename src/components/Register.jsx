import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const database = getDatabase(app);
const auth = getAuth(app);

const usernameExp = /^[a-z0-9A-Z\s]{4,20}$/;
const phoneExp = /^[0-9]{10}$/;
const emailExp = /^[a-zA-Z0-9\.\_\-]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
const passExp = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\/\>\<]{6,20}$/;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pssword, setPssword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const check = (value, regex, errorMsg, setError) => {
    if (regex.test(value)) {
      setError("");
      return true;
    } else {
      setError(errorMsg);
      return false;
    }
  };

  const check2 = (value1, value2, errorMsg, setError) => {
    if (value1 === value2) {
      setError("");
      return true;
    } else {
      setError(errorMsg);
      return false;
    }
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    const isNameValid = check(
      name,
      usernameExp,
      "Only alphabets & numbers allowed. Range 4-20",
      setNameError
    );
    const isEmailValid = check(
      email,
      emailExp,
      "Enter a valid email address",
      setEmailError
    );
    const isNumberValid = check(
      number,
      phoneExp,
      "Only numbers allowed. Max 10 chars",
      setNumberError
    );
    const isPasswordValid = check(
      pssword,
      passExp,
      "Password must be 6-20 characters and include special characters",
      setPasswordError
    );
    const isConfirmPasswordValid = check2(
      pssword,
      confirmPassword,
      "Confirm password must match password",
      setConfirmPasswordError
    );

    if (
      isNameValid &&
      isEmailValid &&
      isNumberValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      createUserWithEmailAndPassword(auth, email, pssword)
        .then((userCredential) => {

          const user = userCredential.user;
          alert("User registered successfully!");

          const usersRef = ref(database, "users");
          push(usersRef, {
            name: name,
            email: email,
            number: number,
            uid: user.uid,
          });

          setName("");
          setEmail("");
          setPssword("");
          setNumber("");
          setConfirmPassword("");
        })
        .catch((error) => {
          console.error("Error during registration: ", error);
          alert("Registration failed: " + error.message);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitBtn}>
        <div>
          <h2 className="heading1">Create Account</h2>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <div style={{ color: "red" }}>{nameError}</div>
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <div style={{ color: "red" }}>{emailError}</div>
        </div>

        <div>
          <label>Number:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your Number"
          />
          <div style={{ color: "red" }}>{numberError}</div>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pssword}
            onChange={(e) => setPssword(e.target.value)}
            placeholder="Enter your Password"
          />
          <div style={{ color: "red" }}>{passwordError}</div>
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password"
          />
          <div style={{ color: "red" }}>{confirmPasswordError}</div>
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="Login">
        <p>
          Already a member?<Link to="/Login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
