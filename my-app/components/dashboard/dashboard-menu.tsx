"use client";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { Home, LineChart, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  funnel: z.string().min(2).max(50),
});

interface Funnel {
  id: number;
  funnel: string;
}

interface DashMenuProps {
  setSheet: (sheet: string) => void;
  setFunnelID: (id: number) => void;
  sheet: string;
  user: User;
}

const DashMenu: React.FC<DashMenuProps> = ({
  setSheet,
  setFunnelID,
  sheet,
  user,
}) => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funnel: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("funnels") // Specify the table name
      .insert([
        {
          funnel: values.funnel, // Specify the values to insert
          user_id: user.id, // Insert the user ID
        },
      ]);

    if (error) {
      console.error("Error inserting data: ", error);
    } else {
      console.log("Inserted data: ", data);
    }

    form.reset();
    fetchFunnels();
  }

  const fetchFunnels = async () => {
    const { data, error } = await supabase.from("funnels").select("*");
    if (error) {
      console.error("Error fetching funnels: ", error);
    } else {
      setFunnels(data as Funnel[]);
    }
  };

  useEffect(() => {
    fetchFunnels();
    setIsLoading(false);
  }, []);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="#"
        onClick={() => setSheet("goals")}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
          sheet === "goals" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Home className="h-4 w-4" />
        Goals
      </Link>
      <Link
        href="#"
        onClick={() => setSheet("analytics")}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
          sheet === "analytics" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
      <Separator className="my-4" />
      <div className="flex items-center gap-3 transition-all">
        <Link
          href="#"
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
        >
          <ShoppingCart className="h-4 w-4" />
          Funnels
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">add a funnel</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">Add a Funnel</DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 flex flex-col"
                >
                  <FormField
                    control={form.control}
                    name="funnel"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="funnel name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogClose>
                    <Button className="mx-auto" type="submit">
                      Submit
                    </Button>
                  </DialogClose>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="ml-4 items-center gap-3 transition-all">
        {isLoading ? (
          <div className="space-y-3 mt-3 ml-3">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ) : (
          funnels.map((funnel) => (
            <Link
              key={funnel.id}
              href="#"
              onClick={() => {
                setSheet(funnel.funnel);
                setFunnelID(funnel.id);
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                sheet === funnel.funnel
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {funnel.funnel}
            </Link>
          ))
        )}
      </div>
    </nav>
  );
};

export default DashMenu;
