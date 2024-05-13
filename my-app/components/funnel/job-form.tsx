import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  // date of application
  date: z.date(),
  // oprional note. i.e. "X companies from recruiter"
  notes: z.string().max(100),
});

interface JobFormProps {
  funnelID: number;
}

const JobForm: React.FC<JobFormProps> = ({ funnelID }) => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      step: "",
      date: new Date(),
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("jobs") // Specify the table name
      .insert([
        {
          funnel_id: funnelID,
          name: values.name,
          step: values.step,
          date: values.date,
          notes: values.notes,
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
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 flex flex-col mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job name</FormLabel>
                  <FormControl>
                    <Input placeholder="job title at company name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application step</FormLabel>

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
                      <SelectItem value="acknowledged">acknowledged</SelectItem>
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of application</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>

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
  );
};

export default JobForm;
