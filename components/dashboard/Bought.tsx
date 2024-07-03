"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { BOUGHT_PRODUCTS } from "@/lib/gql/queries/getBoughtProducts";
import ProductListCard from "../ProductListCard";

const Bought = () => {
  const { data } = useQuery(BOUGHT_PRODUCTS);
  if (data) {
    return (
      <ProductListCard data={data?.getProductTransactionHistoryByBuyerId} />
    );
  } else return <>Loading...</>;
};
export default Bought;
