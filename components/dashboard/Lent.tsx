"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { LENTED_PRODUCTS } from "@/lib/gql/queries/getLentedProducts";
import ProductListCard from "../ProductListCard";

const Lent = () => {
  const { data } = useQuery(LENTED_PRODUCTS);
  if (data) {
    return <ProductListCard data={data?.getProductRentalHistoryByLenterId} />;
  } else return <>Loading...</>;
};
export default Lent;
