"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useMutation } from "@apollo/client";
import { BUY_PRODUCT } from "@/lib/gql/mutations/buyProduct";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { BOUGHT_PRODUCTS } from "@/lib/gql/queries/getBoughtProducts";

const BuyButton = ({
  productId,
  sellerId,
}: {
  productId: string;
  sellerId: string;
}) => {
  const handleSubmit = () => {
    buyProduct({ variables: { productId, sellerId } });
  };
  const [buyProduct, { data }] = useMutation(BUY_PRODUCT, {
    refetchQueries: [
      {
        query: BOUGHT_PRODUCTS,
      },
    ],
  });

  if (data) {
    redirect("/dashboard");
  }

  return (
    <div className="ml-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Buy</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to buy this product?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyButton;
