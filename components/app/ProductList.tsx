"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import BuyButton from "./BuyButton";
import RentButton from "./RentButton";
import { hasCookie } from "cookies-next";

interface ProductListProps {
  data: {
    id: string;
    product_name: string;
    price: number;
    description: string;
    createdAt: string;
    rent_price: number;
    rent_option: string;
    user_id: string;
    categories: {
      id: string;
      category_name: string;
    }[];
  }[];
}

const ProductList = ({ data }: ProductListProps) => {
  const isLogged = hasCookie("sid");
  return (
    <div className="w-full">
      {data.map((data) => (
        <Card key={data.id} className="p-10 h-[400px] w-full my-4 bg-gray-50">
          <div className="flex flex-col gap-2 m-auto h-full cursor-auto">
            <div className="text-2xl font-semibold flex">
              <div className="mr-auto">{data.product_name}</div>
            </div>
            <div className="inline-flex text-xl text-gray-500">
              Categories:
              {data?.categories ? (
                data?.categories.map((category) => (
                  <Card
                    key={category.category_name}
                    className="p-1 text-sm mx-1 text-gray-500"
                  >
                    <p>{category.category_name}</p>
                  </Card>
                ))
              ) : (
                <Card className="p-1 text-sm mx-1 text-gray-500">
                  <p>Loading...</p>
                </Card>
              )}
            </div>
            <div className="inline-flex text-xl text-gray-500">
              <p className="">Price:&nbsp;${data.price}&nbsp;</p>
              <p className="w-[2px] h-[18px] translate-y-1 bg-gray-500"></p>
              <p>&nbsp;Rent:&nbsp;${data.rent_price}&nbsp;</p>{" "}
              <p>{data.rent_option}</p>
            </div>
            <p className="text-xl">{data.description}</p>
            <p className="mt-auto text-gray-500 inline-flex">
              Date posted:&nbsp;{data.createdAt}
            </p>
            {isLogged && (
              <div className="inline-flex">
                <BuyButton productId={data.id} sellerId={data.user_id} />
                <RentButton
                  productId={data.id}
                  lenterId={data.user_id}
                  rentedPrice={data.rent_price}
                />
              </div>
            )}{" "}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
