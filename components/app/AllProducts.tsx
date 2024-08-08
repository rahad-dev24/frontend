"use client";
import React from "react";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries/getAllProducts";
import { useQuery } from "@apollo/client";
import ProductList from "./ProductList";

const AllProducts = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });
  if (data?.getProducts.length > 0)
    return (
      <div className="mt-16 w-2/3">
        <p className="text-2xl text-center font-bold">All Products</p>
        <ProductList data={data.getProducts} />
      </div>
    );
  else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="text-center text-2xl">
        There are no available products to show. Login and create a Product.
      </div>
    );
  }
};

export default AllProducts;
