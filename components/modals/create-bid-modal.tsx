"use client"

import { createBidSchema } from "@/app/actions/schema";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { TimePickerDemo } from "../ui/extended/time-picker";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { createBidAdction } from '@/app/actions/create-bid-action'
import { toast } from "sonner";

export const CreateBidModal = ({
  isOpen,
  onOpenChnage
}: {
  isOpen: boolean;
  onOpenChnage:
  Dispatch<SetStateAction<boolean>>
}) => {
  const createBid = useAction(createBidAdction, {
    onSuccess: () => {
      onOpenChnage(false)
      toast('Bid created')
    },
    onError: (e) => {
      console.log(e);
      console.log('error');

    }
  });

  const form = useForm<z.infer<typeof createBidSchema>>({
    resolver: zodResolver(createBidSchema),
    defaultValues: {
      title: "",
      items: [{ name: "", description: "" }],
      endDateTime: addDays(new Date(), 1),
      startDateTime: new Date(),
    },
  });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: z.infer<typeof createBidSchema>) {
    createBid.execute(values);
    console.log(values);
  }

  useEffect(() => {
    form.reset();
  }, [isOpen]);

  return (
    <DialogContent className="sm:max-w-[525px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <DialogHeader>
            <DialogTitle>Create New Bid</DialogTitle>
            <DialogDescription>
              Fill out the details for your new bid.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] grid grid-cols-2 gap-4 py-4 px-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Bid Title</FormLabel>
                  <FormControl>
                    <Input placeholder="bid title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2"
                    >
                      <div className="rounded-md border flex">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                        <div className="p-3 border-l border-border">
                          <TimePickerDemo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="ml-2">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2"
                    >
                      <div className="rounded-md border flex">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                        <div className="p-3 border-l border-border">
                          <TimePickerDemo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-sm font-medium col-span-2">Bid Items</h1>
            <div className="overflow-y-auto col-span-2 gap-4 grid grid-cols-1 px-2">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant={"outline"}
                      size={"sm"}
                      disabled={index === 0}
                      onClick={() => remove(index)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                onClick={() => append({ name: "", description: "" })}
                className="mt-2"
              >
                Add Item
              </Button>
            </div>
          </div>
          <DialogFooter className="col-span-2">
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
