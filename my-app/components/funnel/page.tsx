import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Goal from "./goal";
import JobForm from "./job-form";
import { JobsTable } from "./jobs-table";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const JobSchema = z.object({
  job_id: z.string(),
  funnel_id: z.string(),
  name: z.string(),
  step: z.string(),
  date: z.date(),
  notes: z.string().optional(),
});

type Job = z.infer<typeof JobSchema>;

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "step",
    header: "Step",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];

interface FunnelPageProps {
  selectedFunnel: string;
  funnelID: number;
}

const FunnelPage: React.FC<FunnelPageProps> = ({
  selectedFunnel,
  funnelID,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClient();

  useEffect(() => {
    fetchJobs();
  }, [funnelID]);

  const fetchJobs = async () => {
    setIsLoading(true); // Set isLoading to true when start fetching data
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("funnel_id", funnelID);

    if (error) console.log("Error: ", error);
    else setJobs(data);
    setIsLoading(false); // Set isLoading to false when finish fetching data
  };

  return (
    <div
      className="flex flex-col md:flex-row flex-1 justify-start h-screen rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Card className="m-4 mb-0 md:w-3/5 md:mb-4">
        <CardHeader>
          <CardTitle>{selectedFunnel}</CardTitle>
        </CardHeader>
        <CardContent>
          <JobsTable columns={columns} data={jobs} isLoading={isLoading} />
        </CardContent>
      </Card>
      <div className="flex flex-col justify-between m-4 space-y-4 md:w-2/5 md:mb-4">
        <JobForm funnelID={funnelID} />
        <Goal />
      </div>
    </div>
  );
};

export default FunnelPage;
