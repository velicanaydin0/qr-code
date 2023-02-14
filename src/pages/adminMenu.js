import { onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../db/Firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";



function AdminMenu() {
  const { user } = useAuthContext();
  

  function deleteProduct(id) {
    const docRef = doc(db, "qrmenu", id);
    deleteDoc(docRef)
      .then(() => console.log("document deleted"))
      .catch((error) => console.log(error.message));
  }

  let a = useCollection("qrmenu", user.auth).documents;
  a = a && a.filter((item) => item.uid === user.uid);
  return (
    <div style={{ marginTop: "40px" }}>
      <table id="customers">
        {a &&
          a.map((item, i) => (
            <tr key={i}>
              <td>
                <img style={{ width: "60px" }} src={item.img}></img>
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.desc.slice(0, 10)}</td>

              <td>
                <button
                  onClick={() => deleteProduct(item.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className=" fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default AdminMenu;
