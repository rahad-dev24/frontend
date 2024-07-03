import SignOut from "@/components/dashboard/SignOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="w-full min-h-screen m-auto relative  pt-5">
          <div className="sticky top-0 flex justify-between w-full overflow-hidden bg-white border-black border-b py-1 px-5">
            <Link href={"/"}>
              <Button variant={"default"}>All Products</Button>
            </Link>
            <Link href={"/dashboard"} className="ml-auto mr-5">
              <Button variant={"default"}>Dashboard</Button>
            </Link>
            <Link href={"/dashboard/my-products"} className=" mr-5">
              <Button variant={"default"}>My Products</Button>
            </Link>
            <Link href={"/dashboard/add-product"}>
              <Button className=" mr-5">Add Product</Button>
            </Link>
            <SignOut />
          </div>
          {children}{" "}
        </main>
      </body>
    </html>
  );
}
