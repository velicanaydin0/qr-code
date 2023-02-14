import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { movieCollectionRef } from "../db/firebase-collection";
import AdminMenu from "./adminMenu";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import QRCode from "qrcode.react";

function Add({items}) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [img, setimg] = useState("");
  const [desc, setdesc] = useState("");
  const [product, setproduct] = useState([]);
  const a = items && items.filter((a) => user.uid === a.uid);

  

  useEffect(() => {
    const q = query(movieCollectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setproduct(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (title === "" && category === "") {
      return;
    }

    //const moviesCollRef = collection(db, "movies");
    addDoc(movieCollectionRef, {
      title: title,
      category: category,
      price: price,
      img: img,
      desc: desc,
      timestamp: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName
    })
      .then((response) => {
        settitle("");
        setcategory("");
        setimg("");
        setdesc("");
        setprice("")
      
      })
      .catch((error) => {
        console.log(error.message);
      });
   
  }
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
      
      <Link to={`/${a==0 ? "admin/add":user.uid}`} className="w3-bar-item w3-button">
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


      <div className="App" style={{ paddingLeft: "70px" }}>
        <div className="w3-container" style={{ padding: "30px"}}>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div
              className="row"
              style={{
                margin: "20px",
                textAlign:"center"
              }}
            >     <div style={{display:"flex"}}><input
            style={{ margin: "3px",border:"1px solid grey"  }}
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            id="title"
            placeholder="title"
          />

          <input
            style={{ margin: "3px",border:"1px solid grey"  }}
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            id="category"
            placeholder="category"
          /></div>
              <div style={{display:"flex"}}><input
                style={{ margin: "3px",border:"1px solid grey"  }}
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                id="price"
                placeholder="price"
              />

              <input
                style={{ margin: "3px",border:"1px solid grey"  }}
                type="text"
                className="form-control"
                value={img}
                onChange={(e) => setimg(e.target.value)}
                id="image"
                placeholder="image"
              /></div>
   <div style={{display:"flex"}}><textarea
                style={{ margin: "3px",border:"1px solid grey" }}
                type="text"
                className="form-control"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                id="desc"
                placeholder="desc"
              />
         
              <button
                style={{
                  margin: "5px",
                  width: "30%",
                  
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "5px",
                }}
                type="submit"
              >
                Add
              </button></div>
              
              
            </div>
            <AdminMenu />
          </form>
        </div>
       {a && a[0] &&  <div
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
                <QRCode
                  value={"http://qrmenu-bice.vercel.app/" + user.uid}
                  size={128}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  renderAs={"svg"}
                  imageSettings={{
                    x: null,
                    y: null,
                    height: 2,
                    width: 2,
                    excavate: true,
                  }}
                />

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
    </>
  );
}

export default Add;
