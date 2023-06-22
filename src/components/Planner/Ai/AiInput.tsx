import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiRequest, AiRequestSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function AiInput({
  input,
  setInput,
  onConfirm,
}: {
  input: AiRequest;
  setInput: (input: AiRequest) => void;
  onConfirm: () => void;
}) {
  const form = useForm<AiRequest>({
    resolver: zodResolver(AiRequestSchema),
    defaultValues: input,
  });

  return (
    <div className="grid gap-3 text-zinc-400">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            setInput(values);
            onConfirm();
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date!)}
                  />
                </FormControl>
                <FormDescription>
                  When do you want to start your journey?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date!)}
                  />
                </FormControl>
                <FormDescription>
                  Based on your Interail pass, when does your journey end?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start city and country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hamburg, Germany" />
                </FormControl>
                <FormDescription>
                  City where you want to start your journey and return to at the
                  end.
                  <br />
                  If you fly in from outside of Europe, choose the city where
                  you land.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel days</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="7" />
                </FormControl>
                <FormDescription>
                  How many travel days does your Interail pass have?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferences</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="I want to visit the Eiffel Tower in Paris."
                  />
                </FormControl>
                <FormDescription>
                  Write any other preferences and requirements you have for your
                  journey.
                  <br />
                  You can write freely here, but generally short inputs work
                  best.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Plan journey</Button>
        </form>
      </Form>
    </div>
  );
}

export default AiInput;
