import { useContext, useState } from "react";
import { UserContext } from "../context/UserContex";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [, setToken] = useContext(UserContext);

  const submitRegistrations = async () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
  
    try {
      const response = await fetch("/api/users", request);
      const data = await response.json();
  
      if (!response.ok) {
        console.log("Error Response:", data); // Log detailed backend response
        setErrorMessage(data.detail || "Registration failed.");
      } else {
        setToken(data.access_token);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 7) {
      submitRegistrations();
    } else {
      setErrorMessage("Ensure that the passwords match and are more than 7 characters");
    }
  };

  return (
    <div className="column">
    <form className="box" onSubmit={handleSubmit}>
      <h1 className="title has-text-centered">Register</h1>
      <div className="field">
        <label className="label">Email Address</label>
        <div className="control">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            type="password"
            placeholder="Enter password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <button className="button is-primary" type="submit">
        Register
      </button>
    </form>
  </div>
  );
};

export default Register;
