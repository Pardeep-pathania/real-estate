import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("http://localhost:3000/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      });

      const data = res.data

      console.log(data);

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log("Could not sign in with google", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
