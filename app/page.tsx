import AllProducts from "@/components/app/AllProducts";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
export default function Home() {
  const cookieStore = cookies();
  const loggedIn = cookieStore.get("sid")?.value;

  return (
    <div className="w-4/6 min-h-screen m-auto  flex flex-col justify-center items-center relative">
      {loggedIn ? (
        <div className="absolute top-8 right-10">
          <Link href={"/dashboard"}>
            <Button variant={"default"}>Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="absolute top-8 right-10">
          <Link href={"/login"}>
            <Button variant={"default"}>Login</Button>
          </Link>
        </div>
      )}
      <AllProducts />
    </div>
  );
}
