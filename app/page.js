import Hero from "./Components/Hero";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="w-full">
      <Hero />
    </div>
  );
};

export default Page;