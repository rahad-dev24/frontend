import React from "react";
import { cookies } from "next/headers";
import Products from "./_lib/Products";

const page = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default page;
