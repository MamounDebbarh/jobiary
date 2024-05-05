// components/FunnelPage.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const GoalPage = () => {
  return (
    <div
      className="flex flex-1 justify-start h-screen rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Card className="w-full m-4">
        <CardHeader>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Funnel data</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoalPage;
