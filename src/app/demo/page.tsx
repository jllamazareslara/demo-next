import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth";

export default async function DemoIndexPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/demo/login");
  }

  redirect("/demo/dashboard");
}

