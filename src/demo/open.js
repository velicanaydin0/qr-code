import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";

import "./open.css";

function Open() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [restaurant, setrestaurant] = useState("");
  const [register, setregister] = useState(
    JSON.parse(localStorage.getItem("user")) || false,
  );

  const { signup } = useSignup();
  const { error, login } = useLogin();
  const { authIsReady, user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(!register));
    signup(email, password, username);
    setTimeout(() => {
      login(email, password);
    }, 1000);
    console.log(email, password);
  };

  const handleSubmitlogin = (e) => {
    e.preventDefault();

    login(email, password);
    console.log(email, password);
    setPassword("");
    setEmail("");

    // console.log(email, password);
  };
  return (
    <div
      style={{
        backgroundColor: "#313131",
        minHeight: "100vh",
      }}
    >
      <div
        className='container'
        style={{ height: "100%", color: "white" }}
      >
        <div
          className='row'
          style={{ paddingTop: "60px", width: "100%" }}
        >
          <div
            className='col'
            style={{
              paddingTop: "2.2%",
              marginLeft: "15px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "white" }}>
              WELC
              <div
                style={{ margin: "4px", width: "20px", height: "21px" }}
                className='spinner-grow text-primary'
                role='status'
              >
                <span className='visually-hidden'>Loading...</span>
              </div>
              ME, Let's make your qr menu!
            </h3>
            <form>
              <input
                type='email'
                name='username'
                placeholder='e-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              {email == "" && error && (
                <div
                  className='alert alert-dark'
                  role='alert'
                >
                  <p style={{ color: "orangered" }}>
                    {error.includes("Firebase") &&
                      "Error (auth/invalid-email)."}
                  </p>
                </div>
              )}

              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  paddingTop: "7px",
                }}
              >
                <button
                  value='Register'
                  className='btn btn-warning'
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Open;
