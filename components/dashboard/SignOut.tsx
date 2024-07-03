"use client";
import React from "react";
import { useMutation } from "@apollo/client";
import { SIGNOUT } from "@/lib/gql/mutations";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { deleteCookie } from "cookies-next";

const SignOut = () => {
  const [signout, { data }] = useMutation(SIGNOUT);

  const logout = () => {
    signout();
    deleteCookie("sid");
  };
  if (data) {
    window.location.replace("/");
  }
  return (
    <Button
      variant={"destructive"}
      onClick={(e) => {
        e.preventDefault();

        logout();
      }}
    >
      Logout
    </Button>
  );
};

export default SignOut;
