import "./admin.css";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import Qrmenu from "./qrmenu";
import { useAuthContext } from "../hooks/useAuthContext";
import QRCode from "qrcode.react";
import { useState } from "react";

function Admin({items}) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [qr, setqr] = useState(false);
  const a = items && items.filter((a) => user.uid === a.uid);

  console.log(a);

  return (
    <>
       <div
      className="w3-sidebar w3-bar-block w3-light w3-xxlarge"
      style={{ width: "70px", backgroundColor: "#313131", color: "white" }}
    >
      <Link to="/admin" className="w3-bar-item w3-button">
        <i className="fa fa-home"></i>
      </Link>
      <Link to="/admin/add" className="w3-bar-item w3-button">
        <i className="fa fa-plus"></i>
      </Link>
      <button
        type="button"
        className="w3-bar-item w3-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        <i onClick={()=> !a[0] && alert("product requirement")} className="fa fa-qrcode "></i>
      </button>
      
      <Link to={`/${a==0 ? "admin/add":user && user.uid}`} className="w3-bar-item w3-button">
        <i onClick={()=> !a[0] && alert("product requirement")} className="fa fa-link"></i>
      </Link>
      <Link to="/admin/settings" className="w3-bar-item w3-button">
        <i className="fa fa-wrench"></i>
      </Link>
     

      <Link
        to="#"
        className="w3-bar-item w3-button"
        style={{ bottom: "10px", position: "absolute" }}
      >
        <i onClick={logout} className="fa fa-power-off"></i>
      </Link>
    </div>


      <div style={{ paddingLeft: "70px" }}>
        <div className="w3-container" style={{ border: "30px solid white" }}>
          <Qrmenu />

          {a && a[0] && <div
            style={{
              justifyContent: "center",

              textAlign: "center",
            }}
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {user && (
                    <QRCode
                      value={"http://qrmenu-bice.vercel.app/" + user.uid}
                      size={128}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                      imageSettings={{
                        src:"",
                        x: null,
                        y: null,
                        height: 2,
                        width: 2,
                        excavate: true,
                      }}
                    />
                  )}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Admin;
