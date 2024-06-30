"use client";
import { useQuery } from "@apollo/client";
import { get_products_by_user } from "./gql/query/getProductsByUser";
import { Card } from "@/components/ui/card";
const Products = () => {
  const { data } = useQuery(get_products_by_user, {
    variables: {
      getUserId: "",
    },
  });
  console.log(data?.getUser?.products);
  return (
    <Card>
      {data?.getUser?.products.map(
        (product: {
          created_at: string;
          description: string;
          id: string;
          product_name: string;
          rent_option: string;
          price: number;
          rent_price: number;
          product_category: { category: { category_name: string } };
        }) => {
          return (
            <div key={product.id}>
              <p>{product.product_name}</p>
              <p>{product.description}</p>
              <p>{product.created_at}</p>
              <p>{product.rent_price}</p>
              <p>{product.rent_option}</p>
              <p>{product.price}</p>
            </div>
          );
        },
      )}
    </Card>
  );
};

export default Products;
