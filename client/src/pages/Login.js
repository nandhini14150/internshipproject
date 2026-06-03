import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");

  const loginUser = async () => {

    const res = await API.post(
      "/auth/login",
      {
        email
      }
    );

    alert(res.data.message);

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    // REDIRECT TO HOME PAGE
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          padding:"10px",
          width:"300px"
        }}
      />

      <br /><br />

      <button
        onClick={loginUser}
        style={{
          padding:"10px"
        }}
      >
        Login
      </button>

    </div>
  );
}

export default Login;