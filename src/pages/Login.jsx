import React from "react";
import "firebase/app";
import { FcGoogle } from "react-icons/fc";
import * as firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth, db, auths, provider } from "../components/myfirebase";

const googleHandler = () => {
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auths, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // redux action? --> dispatch({ type: SET_USER, user });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const Login = () => {
  return (
    <div className="sm:px-[40%] p-20">
      <h1 className="text-center pb-10 font-bold text-[22px]">
        Welcome to FunChat
      </h1>
      <div
        className="border text-center rounded-[10px] p-5 shadow cursor-pointer"
        onClick={googleHandler}
      >
        <h1 className="flex gap-3">
          <FcGoogle className="text-[25px]" />
          Sign in with Google
        </h1>
      </div>
    </div>
  );
};

export default Login;
