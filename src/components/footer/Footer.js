import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import React from "react";

function Footer() {
  return (
    <div style={{ backgroundColor: "#313131" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <hr />
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "white",
        }}
      >
        Developed by{" "}
        <a
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
          }}
          href="https://www.linkedin.com/in/omersut/"
          target="blank"
        >
          /omerSut
        </a>
      </div>
    </div>
  );
}

export default Footer;
