import React from "react";

import { Card } from "@/components/ui/card";

interface ProductListProps {
  data: {
    id: string;
    product_name: string;
    price: number;
    description: string;
    createdAt: string;
    rent_price: number;
    rent_option: string;
    categories: {
      id: string;
      category_name: string;
    }[];
  }[];
}

const ProductListCard = ({ data }: { data: ProductListProps[] }) => {
  if (data === undefined || data === null) return null;
  return (
    <div className="w-full">
      {data?.map((data: any) => (
        <Card
          key={data.product.id}
          className="p-10 h-[400px] w-full my-4 bg-gray-50"
        >
          <div className="flex flex-col gap-2 m-auto h-full cursor-auto">
            <div className="text-2xl font-semibold flex">
              <div className="mr-auto">{data.product.product_name}</div>
            </div>
            {/** <div className="inline-flex text-xl text-gray-500">
              Categories:
              {data?.categories.map((category) => {
                return (
                  <Card
                    key={category.id}
                    className="p-1 text-sm mx-1 text-gray-500"
                  >
                    <p>{category.category_name}</p>
                  </Card>
                );
              })}
            </div>**/}
            <div className="inline-flex text-xl text-gray-500">
              <p className="">Price:&nbsp;${data.product.price}&nbsp;</p>
              <p className="w-[2px] h-[18px] translate-y-1 bg-gray-500"></p>
              <p>&nbsp;Rent:&nbsp;${data.product.rent_price}&nbsp;</p>{" "}
              <p>{data.product.rent_option}</p>
            </div>
            <p className="text-xl">{data.product.description}</p>
            <p className="mt-auto text-gray-500 inline-flex">
              &nbsp;{data.product.createdAt.slice(0, 10)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductListCard;
