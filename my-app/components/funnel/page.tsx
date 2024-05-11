// components/FunnelPage.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Goal from "./goal";
import JobForm from "./job-form";

interface FunnelPageProps {
  funnel: string;
}

const FunnelPage: React.FC<FunnelPageProps> = ({ funnel }) => {
  return (
    <div
      className="flex flex-col md:flex-row flex-1 justify-start h-screen rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Card className="m-4 mb-0 md:w-3/5  md:mb-4">
        <CardHeader>
          <CardTitle>{funnel}</CardTitle>
          <CardDescription>Funnel data</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <div className="flex flex-col justify-between m-4 space-y-4 md:w-2/5 md:mb-4">
        <JobForm />
        <Goal />
      </div>
    </div>
  );
};

export default FunnelPage;
