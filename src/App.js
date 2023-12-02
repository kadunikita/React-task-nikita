import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [timer, setTimer] = useState(60);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "", // Additional field for the name
  });

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (loggedIn) {
      timeoutId = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          handleLogout();
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeoutId);
    };
  }, [loggedIn, timer]);

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email: signupData.email,
        password: signupData.password,
        name: signupData.name,
      });

      console.log("Registration successful:", response.data);

      // Assuming successful registration
      setLoggedIn(true);
      setTimer(60);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: signupData.email,
        password: signupData.password,
      });

      console.log("Login successful:", response.data);

      // Assuming successful login
      setLoggedIn(true);
      setTimer(60);
    } catch (error) {
      console.error("Login failed:", error.message);
      // If login fails, show the registration form
      setShowRegisterForm(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setTimer(60);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome to the App!</h1>
          <p>Time remaining: {timer} seconds</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {showRegisterForm ? (
            <div>
              <h1>Create an HTML Signup Form</h1>
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={signupData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>
                  Register
                </button>
                <button type="button" onClick={() => setShowRegisterForm(false)}>
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1>Login</h1>
              <form>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={signupData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
                <button type="button" onClick={() => setShowRegisterForm(true)}>
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
