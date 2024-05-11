// components/FunnelPage.tsx
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  // company or rectruiter name
  name: z.string().min(2).max(50),
  // 5 step application process
  step: z.string({
    required_error: "Please select an application step.",
  }),
  // oprional note. i.e. "X companies from recruiter"
  notes: z.string().max(100),
});

interface FunnelPageProps {
  funnel: string;
}

const FunnelPage: React.FC<FunnelPageProps> = ({ funnel }) => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      step: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: consider passing USER from parent component istead of checking again?
    const user = (await supabase.auth.getUser()).data.user?.id;

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("jobs") // Specify the table name
      .insert([
        {
          funnel: values.name, // Specify the values to insert
          user_id: user, // Insert the user ID
        },
      ]);

    if (error) {
      console.error("Error inserting data: ", error);
    } else {
      console.log("Inserted data: ", data);
    }

    form.reset();
  }

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
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>job name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="job title at company name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="step"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>application step</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an application step." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="applied">applied</SelectItem>
                          <SelectItem value="acknowledged">
                            acknowledged
                          </SelectItem>
                          <SelectItem value="first step">first step</SelectItem>
                          <SelectItem value="final step">final step</SelectItem>
                          <SelectItem value="offer">offer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>notes</FormLabel>

                      <Textarea
                        placeholder="additional notes."
                        className="resize-none"
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <Button className="mx-auto" type="submit">
                  Add job
                </Button>
              </form>
            </Form>
          </CardContent>
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
