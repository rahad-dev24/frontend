"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/gql/queries";
import { GET_PRODUCT_BY_ID } from "@/lib/gql/queries";
import UpdateForm from "./UpdateForm";
const FormWrapper = ({ id }: { id: string }) => {
  const { data: product } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      getProductId: id,
    },
  });
  const { data: categories } = useQuery(GET_CATEGORIES);
  return (
    <div className="w-full  h-full my-20">
      {product && categories && (
        <UpdateForm
          product={product?.getProduct}
          categories={categories?.getCategories}
        />
      )}
    </div>
  );
};

export default FormWrapper;
