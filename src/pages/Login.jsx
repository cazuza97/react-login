import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("username", username);
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Welcome to CodeLeap network!</h2>

        <label>Please enter your username</label>

        <input
          type="text"
          placeholder="John doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button disabled={!username} onClick={handleSubmit}>
          ENTER
        </button>
      </div>
    </div>
  );
}

export default Login;