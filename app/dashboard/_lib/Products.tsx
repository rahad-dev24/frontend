"use client";
import { useQuery } from "@apollo/client";
import { get_products_by_user } from "./gql/query/getProductsByUser";
import Link from "next/link";
const Products = () => {
  const { data } = useQuery(get_products_by_user, {
    variables: {
      getUserId: "",
    },
  });
  console.log(data);
  return (
    <div>
      Products
      <Link href="/dashboard/add-product">Add Product</Link>
    </div>
  );
};

export default Products;
