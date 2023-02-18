import { onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../db/Firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

import AWS from "aws-sdk";

const key = process.env.REACT_APP_AWS_KEY;
const secret = process.env.REACT_APP_AWS_SECRET;
const bucket = process.env.REACT_APP_AWS_BUCKET;

AWS.config.update({
  accessKeyId: `${key}`,
  secretAccessKey: `${secret}`,
  region: "eu-central-1",
  signatureVersion: "v4",
});

function AdminMenu() {
  const { user } = useAuthContext();

  function deleteProduct(item) {
    console.log(
      "item",
      item.img.split(
        "https://lizboon-qr-menu-2023.s3.eu-central-1.amazonaws.com/",
      )[1],
    );
    const docRef = doc(db, `qrmenu-${user.uid}`, item.id);
    deleteDoc(docRef)
      .then(() => {
        let s3bucket = new AWS.S3({
          accessKeyId: key,
          secretAccessKey: secret,
          Bucket: "lizboon-qr-menu-2023",
        });
        var params = {
          Bucket: "lizboon-qr-menu-2023",
          Key: decodeURI(
            item.img.split(
              "https://lizboon-qr-menu-2023.s3.eu-central-1.amazonaws.com/",
            )[1],
          ),
        };
        s3bucket.deleteObject(params, function (err, data) {
          console.log("data", err, data);
        });
      })
      .catch((error) => console.log(error.message));
  }

  let a = useCollection(`qrmenu-${user.uid}`, user.auth).documents;
  a = a && a.filter((item) => item.uid === user.uid);
  return (
    <div style={{ marginTop: "40px" }}>
      <table id='customers'>
        {a &&
          a.map((item, i) => (
            <tr key={i}>
              <td>
                <img
                  style={{ width: "60px" }}
                  src={item.img}
                ></img>
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.desc.slice(0, 10)}</td>

              <td>
                <button
                  onClick={() => deleteProduct(item)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className=' fa fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default AdminMenu;
