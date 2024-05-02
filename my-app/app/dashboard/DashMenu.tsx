"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { Home, LineChart, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  funnel: z.string().min(2).max(50),
});

interface Funnel {
  id: number;
  funnel: string;
  // Add other properties here...
}

export default function DashMenu() {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funnel: "",
    },
  });

  const [funnels, setFunnels] = useState<Funnel[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = (await supabase.auth.getUser()).data.user?.id;

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    console.log(user);

    const { data, error } = await supabase
      .from("funnels") // Specify the table name
      .insert([
        {
          funnel: values.funnel, // Specify the values to insert
          user_id: user, // Insert the user ID
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
  }, []);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Goals
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
          <DialogTrigger className="ml-auto rounded-full">
            <Plus />
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
        {funnels.map((funnel) => (
          <Link
            key={funnel.id}
            href="#"
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
          >
            {funnel.funnel}
          </Link>
        ))}
      </div>
    </nav>
  );
}
