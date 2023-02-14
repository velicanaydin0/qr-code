import Footer from "../components/footer/Footer";
import "./open.css";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import Adminp from "../pages/adminp";

function Open() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [restaurant, setrestaurant] = useState("");
  const [register, setregister] = useState(JSON.parse(localStorage.getItem("user")) || false);
  
  const { signup } = useSignup();
  const { error, login } = useLogin();
  const { authIsReady, user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(!register))
      signup(email, password,username)
      setTimeout(() => {
        login(email, password);
      }, 1000);
      console.log(email, password)
 
    
  };

  const handleSubmitlogin = (e) => {
    e.preventDefault();

   
      login(email, password);
      console.log(email, password)
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
      <div className="container" style={{ height: "100%", color: "white" }}>
        <h1>
          <i className="fa fa-qrcode "></i> <i className="fa fa-qrcode "></i>{" "}
          <i className="fa fa-qrcode "></i>
        </h1>
        <div className="row" style={{ paddingTop: "60px", width: "100%" }}>
          <div
            className="col-md-1"
            style={{ padding: "35px", marginTop: "1%", marginLeft: "15px" }}
          ></div>
          <div
            className="col"
            style={{ paddingTop: "2.2%", marginLeft: "15px",textAlign:"center" }}
          >
            <h3 style={{ color: "white"}}>
              WELC
              <div
                style={{ margin: "4px", width: "20px", height: "21px" }}
                className="spinner-grow text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              ME, Let's make your qr menu!
            </h3>
            <form>
            {!register && <input
                type="text"
                name="username"
                placeholder="restaurant name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  
              />}
              <input
                type="email"
                name="username"
                placeholder="e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              

              {email == "" && error && (
                <div className="alert alert-dark" role="alert">
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
                  style={{ width: "49.1%" }}
                  value="Register"
                  className="btn btn-warning"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <button
                  className="btn btn-success"
                  style={{ width: "49.1%", color: "white" }}
                  value="Login"
                  onClick={handleSubmitlogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div
            className="col"
            style={{ padding: "35px", marginTop: "1%", marginLeft: "15px" }}
          >
            <QRCode
              style={{ boxShadow: "1px 1px 0px 15px white" }}
              value={"http://qrmenu-bice.vercel.app/demo"}
              size={228}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
              renderAs={"svg"}
              imageSettings={{
                src: "https://upload.wikimedia.org/wikipedia/commons/3/31/QR_icon.svg",
                x: null,
                y: null,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
            <div>
              <Link style={{ color: "white" }} to={"/demo"}>
                <button style={{ width: "300px" }} className="btn btn-primary">
                  For DEMO
                </button>
              </Link>
            </div>
          </div>
          <div
            className="col-md-1"
            style={{ padding: "35px", marginTop: "1%", marginLeft: "15px" }}
          ></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Open;
