"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { BORROWED_PRODUCTS } from "@/lib/gql/queries/getBorrowedProducts";
import ProductListCard from "../ProductListCard";

const Borrowed = () => {
  const { data } = useQuery(BORROWED_PRODUCTS);
  if (data) {
    return <ProductListCard data={data?.getProductRentalHistoryByBorrowerId} />;
  } else return <>Loading...</>;
};
export default Borrowed;
