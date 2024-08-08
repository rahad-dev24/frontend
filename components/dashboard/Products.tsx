"use client";
import EditProduct from "./EditProduct";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_USER } from "@/lib/gql/queries/getProductsByUser";
import { Card } from "@/components/ui/card";
import DeleteProduct from "./DeleteProduct";
import { GET_CATEGORIES } from "@/lib/gql/queries/getCategories";
const Products = () => {
  const { data } = useQuery(GET_PRODUCTS_BY_USER, {
    variables: {
      userId: "",
    },
    fetchPolicy: "cache-first",
  });

  const { data: categories } = useQuery(GET_CATEGORIES);
  const products = data?.getProducts_by_user;
  return (
    <div className="pb-36">
      {products?.map(
        (product: {
          createdAt: string;
          description: string;
          id: string;
          product_name: string;
          rent_option: string;
          price: number;
          rent_price: number;
          categories: { id: string }[];
        }) => {
          return (
            <Card key={product.id} className="p-10 h-[400px] my-4 bg-gray-50">
              <div className="flex flex-col gap-2 m-auto h-full cursor-auto">
                <div className="text-2xl font-semibold flex">
                  <div className="mr-auto">{product.product_name}</div>
                  <EditProduct productId={product.id} />
                  <DeleteProduct productId={product.id} />
                </div>
                <div className="inline-flex text-xl text-gray-500">
                  Categories:
                  {product?.categories.map((category: { id: string }) => {
                    return categories?.getCategories.map(
                      (category_name: {
                        id: string;
                        category_name: string;
                      }) => {
                        if (category.id == category_name.id)
                          return (
                            <Card
                              key={category_name.id}
                              className="p-1 text-sm mx-1 text-gray-500"
                            >
                              <p>{category_name.category_name}</p>
                            </Card>
                          );
                      },
                    );
                  })}
                </div>
                <div className="inline-flex text-xl text-gray-500">
                  <p className="">Price:&nbsp;${product.price}&nbsp;</p>
                  <p className="w-[2px] h-[18px] translate-y-1 bg-gray-500"></p>
                  <p>&nbsp;Rent:&nbsp;${product.rent_price}&nbsp;</p>{" "}
                  <p>Per {product.rent_option}</p>
                </div>
                <p className="text-xl">{product.description}</p>
                <p className="mt-auto text-gray-500">
                  Date posted:&nbsp;{product.createdAt}
                </p>
              </div>
            </Card>
          );
        },
      )}
    </div>
  );
};

export default Products;
