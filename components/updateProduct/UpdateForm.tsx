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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "@/lib/gql/mutations";
import { productSchema } from "@/lib/zod/schema";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { GET_PRODUCTS_BY_USER } from "@/lib/gql/queries";

const UpdateForm = ({
  product,
  categories,
}: {
  product: {
    id: string;
    product_name: string;
    description: string;
    price: number;
    rent_price: number;
    rent_option: string;
    categories: { id: string; category_name: string }[];
  };
  categories: { id: string; category_name: string }[];
}) => {
  //placeholder for categories
  const placeholder_categories = product?.categories.map((category) => {
    return category.category_name;
  });

  //form state and resolver
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: product?.product_name,
      description: product?.description,
      price: product?.price,
      rent_price: product?.rent_price,
      rent_option: product?.rent_option,
      categories: placeholder_categories,
    },
  });

  //mutation
  const [updateProduct, { data, loading, error, client }] = useMutation(
    UPDATE_PRODUCT,
    {
      refetchQueries: [
        { query: GET_PRODUCTS_BY_USER, variables: { userId: "" } },
      ],
    },
  );

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    // Handle form submission here
    let product_categories: string[] = [];

    let i = 0;
    while (i < data.categories.length) {
      categories.map((category) => {
        if (data?.categories[i] === category.category_name) {
          product_categories.push(category.id);
        }
      });
      i++;
    }
    updateProduct({
      variables: {
        updateProductId: product.id,
        productName: data.product_name,
        description: data.description,
        price: data.price,
        rentPrice: data.rent_price,
        rentOption: data.rent_option,
        categories: product_categories,
      },
    });
  };

  //redirect after successful registration
  if (data) {
    redirect("/dashboard/my-products");
  }
  return (
    <Card className="w-[600px] h-[800px] m-auto bg-gray-50 grid grid-rows-12">
      <CardHeader className="row-span-1">
        <CardTitle className="text-center">Create Product</CardTitle>
      </CardHeader>
      <CardContent className="row-span-9">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4 p-8 m-auto h-1/3 "
          >
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2 text-center">
                    <FormLabel className="text-xl">
                      Select a title for your product
                    </FormLabel>
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
              name="categories"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xl">Select categories</FormLabel>
                    <FormControl>
                      <MultiSelector
                        values={field.value}
                        onValuesChange={field.onChange}
                        loop
                        className="w-full"
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {categories?.map(
                              (category: {
                                id: string;
                                category_name: string;
                              }) => (
                                <MultiSelectorItem
                                  key={category.id}
                                  value={category.category_name}
                                >
                                  {category.category_name}
                                </MultiSelectorItem>
                              ),
                            )}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
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
                    <FormLabel className="text-xl">
                      Select description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="h-[150px]"
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
                    <FormLabel>Rent price</FormLabel>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rent option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hour">per hour</SelectItem>
                        <SelectItem value="Day">per day</SelectItem>
                        <SelectItem value="Month">per month</SelectItem>
                      </SelectContent>
                    </Select>{" "}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="row-span-1">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-1/4 m-auto mt-6"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateForm;
