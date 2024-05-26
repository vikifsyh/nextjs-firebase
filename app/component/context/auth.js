"use client";
import { Authentication } from "@/services/firebase";
import { useEffect } from "react";

const AuthStateChangeProvider = () => {
  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("user is authenticated");
        console.log(user);
      } else {
        console.log("user is not authenticated");
      }
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);
  return <></>;
};
export default AuthStateChangeProvider;
