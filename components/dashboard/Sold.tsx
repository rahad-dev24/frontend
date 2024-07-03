"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { SOLD_PRODUCTS } from "@/lib/gql/queries/getSoldProducts";
import ProductListCard from "../ProductListCard";

const Sold = () => {
  const { data } = useQuery(SOLD_PRODUCTS);

  if (data) {
    return (
      <ProductListCard data={data?.getProductTransactionHistoryBySellerId} />
    );
  } else return <>Loading...</>;
};
export default Sold;
