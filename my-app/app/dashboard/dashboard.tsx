"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Package2 } from "lucide-react";

import AnalyticsPage from "@/components/analytics/page";
import ClientAuthButton from "@/components/dashboard/client-auth-button";
import GoalPage from "@/components/goal/page";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import DashMenu from "../../components/dashboard/dashboard-menu";
import FunnelPage from "../../components/funnel/page";

interface DashboardPageProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [sheet, setSheet] = useState("goals");
  const [funnelID, setFunnelID] = useState<number>(0);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Jobiary</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <DashMenu
              setSheet={setSheet}
              setFunnelID={setFunnelID}
              sheet={sheet}
              user={user}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <DashMenu
                setSheet={setSheet}
                setFunnelID={setFunnelID}
                sheet={sheet}
                user={user}
              />
            </SheetContent>
          </Sheet>
          <div className="ml-auto">
            <ClientAuthButton user={user} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {sheet === "goals" || sheet === "" || sheet === null ? (
            <GoalPage />
          ) : sheet === "analytics" ? (
            <AnalyticsPage />
          ) : (
            <FunnelPage selectedFunnel={sheet} funnelID={funnelID} />
          )}
        </main>
      </div>
    </div>
  );
}
