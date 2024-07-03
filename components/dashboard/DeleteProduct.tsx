"use client";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "@/lib/gql/mutations";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";

export default function DeleteProduct({ productId }: { productId: string }) {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Card className="bg-red-500 p-3">
          <Trash className="w-4 h-4 text-white" />
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteProduct({
                variables: { deleteProductId: productId },
                update: (cache) => {
                  cache.evict({ id: "Product:" + productId });
                  cache.gc();
                },
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
