"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import { CREATE_PRODUCT } from "./gql/mutation/createProduct";
import { schema } from "./gql/mutation/ProductSchema";

const ProductForm = () => {
  //form progress state
  const [step, setStep] = React.useState(1);

  //form state and resolver
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: "",
      description: "",
      price: 0,
      rent_price: 0,
      rent_option: "",
      product_category: [],
    },
  });

  //mutation
  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const onSubmit = (data: z.infer<typeof schema>) => {
    // Handle form submission here
    createProduct({
      variables: data,
    });
  };

  //redirect after successful registration
  if (data) {
    redirect("/dashboard");
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle className="text-center">Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4 p-8 m-auto "
          >
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Select a title for your product</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Product title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="product_category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Select categories</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Select description</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Select price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Purchase price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="rent_price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rent price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="rent_option"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Rent option</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className=" col-span-2 w-1/4 m-auto mt-6"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="m-auto">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
