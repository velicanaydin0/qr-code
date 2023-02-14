import { auth } from "../db/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("login");
    signOut(auth)
      .then(() => {
        // console.log("çıkış yapıldı");
        dispatch({ type: "LOGOUT" });

        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};
