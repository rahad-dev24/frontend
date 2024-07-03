"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const EditProduct = ({ productId }: { productId: string }) => {
  return (
    <Link className="mr-5" href={`/dashboard/${productId}`}>
      <Button variant={"outline"}>
        <Edit className="w-5 h-5 " />
      </Button>
    </Link>
  );
};

export default EditProduct;
