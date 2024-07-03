"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { useMutation } from "@apollo/client";
import { BORROW_PRODUCT } from "@/lib/gql/mutations";
import { BORROWED_PRODUCTS } from "@/lib/gql/queries/getBorrowedProducts";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

const rentSchema = z.object({
  productId: z.string(),
  lenterId: z.string(),
  rentedPrice: z.number(),
  rentedAt: z.date({
    required_error: "A date is required.",
  }),
  returnedAt: z.date({
    required_error: "A date is required.",
  }),
});

const RentButton = ({
  productId,
  lenterId,
  rentedPrice,
}: {
  productId: string;
  lenterId: string;
  rentedPrice: number;
}) => {
  const form = useForm<z.infer<typeof rentSchema>>({
    resolver: zodResolver(rentSchema),
    defaultValues: {
      productId: productId,
      lenterId: lenterId,
      rentedPrice: rentedPrice,
      rentedAt: new Date(),
      returnedAt: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof rentSchema>) => {
    console.log(values);
    borrowProduct({
      variables: {
        productId: values.productId,
        lenterId: values.lenterId,
        rentedPrice: values.rentedPrice,
        rentedAt: values.rentedAt.toISOString().toString(),
        returnedAt: values.returnedAt.toISOString().toString(),
      },
    });
  };

  const [borrowProduct, { data, loading, error }] = useMutation(
    BORROW_PRODUCT,
    {
      refetchQueries: [
        {
          query: BORROWED_PRODUCTS,
        },
      ],
    },
  );

  if (data) {
    redirect("/dashboard");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="inline-flex ml-5 " variant={"outline"}>
          Rent
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-5">
            Rental Period
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2 justify-between"
              >
                <FormField
                  control={form.control}
                  name="rentedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="returnedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>To</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RentButton;
