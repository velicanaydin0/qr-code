import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/Firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = (email, password,displayName) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log("kullanıcı giriş yaptı", res.user);
        dispatch({ type: "LOGIN", payload: res.user });
        localStorage.setItem("login", "true");
        
        navigate("/admin");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
