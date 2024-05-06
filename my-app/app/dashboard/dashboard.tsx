"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Package2 } from "lucide-react";

import ClientAuthButton from "@/components/ClientAuthButton";
import AnalyticsPage from "@/components/dashboard/analyticsPage";
import GoalPage from "@/components/dashboard/goalPage";
import Link from "next/link";
import { useState } from "react";
import DashMenu from "../../components/dashboard/DashMenu";
import FunnelPage from "../../components/funnel/funnelPage";

export default function DashboardPage() {
  const [sheet, setSheet] = useState("goals");

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
            <DashMenu setSheet={setSheet} sheet={sheet} />
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
              <DashMenu setSheet={setSheet} sheet={sheet} />
            </SheetContent>
          </Sheet>
          <div className="ml-auto">
            <ClientAuthButton />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {sheet === "goals" || sheet === "" || sheet === null ? (
            <GoalPage />
          ) : sheet === "analytics" ? (
            <AnalyticsPage />
          ) : (
            <FunnelPage funnel={sheet} />
          )}
        </main>
      </div>
    </div>
  );
}
