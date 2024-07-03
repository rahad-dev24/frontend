"use client";
import React from "react";
import Bought from "./Bought";
import Lent from "./Lent";
import Sold from "./Sold";
import Borrowed from "./Borrowed";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Wrapper = () => {
  const [isLoaded, setIsLoaded] = React.useState(1);

  return (
    <div className="w-full m-auto">
      <div className=" text-2xl font-semibold flex justify-evenly gap-40 border-b border-black py-2 ">
        <Button
          variant={"ghost"}
          onClick={() => setIsLoaded(1)}
          className={cn(isLoaded === 1 && "text-xl text-white bg-gray-500")}
        >
          Bought
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setIsLoaded(2)}
          className={cn(isLoaded === 2 && "text-xl text-white bg-gray-500")}
        >
          Sold
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setIsLoaded(3)}
          className={cn(isLoaded === 3 && "text-xl text-white bg-gray-500")}
        >
          Borrowed
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setIsLoaded(4)}
          className={cn(isLoaded === 4 && "text-xl text-white bg-gray-500")}
        >
          Lent
        </Button>{" "}
      </div>
      <div className="w-1/2 m-auto">
        {isLoaded === 1 && <Bought />} {isLoaded === 2 && <Sold />}{" "}
        {isLoaded === 3 && <Borrowed />} {isLoaded === 4 && <Lent />}
      </div>
    </div>
  );
};

export default Wrapper;
