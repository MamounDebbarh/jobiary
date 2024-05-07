"use server";

import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import DashboardPage from "./dashboard";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <DashboardPage user={data.user} />
    </>
  );
}
