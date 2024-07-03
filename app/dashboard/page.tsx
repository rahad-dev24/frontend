import Wrapper from "@/components/dashboard/Wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const page = () => {
  const cookieStore = cookies();
  const loggedIn = cookieStore.get("sid")?.value;

  if (!loggedIn) {
    redirect("/login");
  }

  return <Wrapper />;
};

export default page;
