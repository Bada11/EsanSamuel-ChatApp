import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth, auths, db } from "../components/myfirebase";
import { AuthContext } from "../Context/AuthContext";
import axios, * as others from "axios";
import { AiFillWechat } from "react-icons/ai";

const Chats = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const LogOut = async () => {
    await auths.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");

      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "47098669-19c6-4d9f-9b5a-17403a99326d",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);

          axios.post("https://api.chatengine.io/users/", formData, {
            headers: {
              "private-key": "d58489b5-7591-4d11-902e-90e8bc4c3a8a",
            },
          });
        });
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [user, navigate]);

  if (!user || loading) return "Loading...";

  return (
    <div className="">
      <div className="border p-5">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-[25px]">FunChat</h1>
          <h1 className="cursor-pointer" onClick={LogOut}>
            Logout
          </h1>
        </div>
      </div>

      <div className="">
        <ChatEngine
          height="calc(100vh - 90px)"
          projectID="47098669-19c6-4d9f-9b5a-17403a99326d"
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
};

export default Chats;
