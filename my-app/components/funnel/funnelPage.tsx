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

interface FunnelPageProps {
  funnel: string;
}

const FunnelPage: React.FC<FunnelPageProps> = ({ funnel }) => {
  return (
    <div
      className="flex flex-1 justify-start h-screen rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Card className="w-3/5 my-4 ml-4">
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
      <div className="flex flex-col justify-between w-2/5 m-4 h-ful space-y-4">
        <Card className="h-3/5">
          <CardHeader>
            <CardTitle>Form</CardTitle>
            <CardDescription>add data</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="h-2/5">
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription>goal progressions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FunnelPage;
