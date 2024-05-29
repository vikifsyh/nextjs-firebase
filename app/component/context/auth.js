"use client";
import { Authentication } from "@/services/firebase";
import { useEffect, useId, useState } from "react";
import { initialUserState, useUser } from "./user";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("user is authenticated");
        SetUser({ email: user.email, uid: user.uid });
      } else {
        console.log("user is not authenticated");
        SetUser(initialUserState);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return children;
};
export default AuthStateChangeProvider;
