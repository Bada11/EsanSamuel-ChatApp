import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/myfirebase";
import { auths } from "../components/myfirebase";

export const AuthContext = createContext();

export const AuthPageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    auths.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) navigate("/Chat");
    });
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
