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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "@/lib/gql/mutations/index";
import { GET_PRODUCTS_BY_USER } from "@/lib/gql/queries/getProductsByUser";
import { productSchema } from "@/lib/zod/schema/index";
import { GET_CATEGORIES } from "@/lib/gql/queries/index";
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
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries/getAllProducts";

const ProductForm = () => {
  //form progress state
  const [step, setStep] = React.useState(1);

  //form state and resolver
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      description: "",
      price: 0,
      rent_price: 0,
      rent_option: "",
      categories: [],
    },
  });

  //Query
  const { data: categories } = useQuery(GET_CATEGORIES);

  //mutation
  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS,
        },
      ],
      update(cache, { data: { createProduct } }) {
        const existingProducts = cache.readQuery({
          query: GET_PRODUCTS_BY_USER,
          variables: { userId: "" },
        });

        existingProducts
          ? cache.writeQuery({
              query: GET_PRODUCTS_BY_USER,
              variables: { userId: "" },
              data: {
                getProducts_by_user: [
                  createProduct,
                  ...existingProducts?.getProducts_by_user,
                ],
              },
            })
          : cache.writeQuery({
              query: GET_PRODUCTS_BY_USER,
              variables: { userId: "" },
              data: {
                getProducts_by_user: [createProduct],
              },
            });
      },
    },
  );

  //Getting data for Summary section
  const formData = form.getValues();

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    // Handle form submission here

    let product_categories: string[] = [];
    data?.categories.map((category) => {
      categories?.getCategories.map(
        (c: { id: string; category_name: string }) => {
          if (category === c.category_name) {
            return product_categories.push(c.id);
          }
        },
      );
    });
    createProduct({
      variables: {
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
    <Card className="w-[600px] h-[600px] bg-gray-50 grid content-center grid-rows-12">
      <CardHeader className="row-span-1">
        <CardTitle className="text-center">Create Product</CardTitle>
      </CardHeader>
      <CardContent className="row-span-9 content-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4 p-8 m-auto h-1/3 "
          >
            {step == 1 && (
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
            )}
            {step == 2 && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-xl">
                        Select categories
                      </FormLabel>
                      <FormControl>
                        <MultiSelector
                          values={field.value}
                          onValuesChange={field.onChange}
                          loop
                          className="w-full"
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {categories?.getCategories.map(
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
            )}
            {step == 3 && (
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
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
            {step == 4 && (
              <>
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
              </>
            )}
            {step == 5 && (
              <div className="col-span-2 -translate-y-1/3">
                <h1 className="text-xl font-bold mb-5">Summary</h1>
                <p className="inline-flex text-lg font-bold">
                  Title:&nbsp;
                  <span className=" font-normal ">{formData.product_name}</span>
                </p>
                <br />
                <p className="inline-flex text-lg font-bold">
                  Categories:&nbsp;{" "}
                </p>
                {formData.categories.map((category) => (
                  <p className="inline-flex" key={category}>
                    {" "}
                    <Card> &nbsp;{category} &nbsp; </Card>
                  </p>
                ))}

                <br />
                <p className="inline-flex text-lg font-bold">
                  Description: &nbsp;
                  <span className=" font-normal">{formData.description}</span>
                </p>
                <br />
                <p className="inline-flex text-lg font-bold">
                  Price: &nbsp;{" "}
                  <span className="font-normal">${formData.price} &nbsp; </span>
                </p>
                <p className="inline-flex text-lg font-bold">
                  &nbsp; &nbsp; To rent:&nbsp;
                  <span className=" font-normal">${formData.rent_price} </span>
                </p>
                <p className="inline-flex">
                  {" "}
                  &nbsp;&nbsp;Per&nbsp;{formData.rent_option}
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="row-span-1">
        {step != 1 && (
          <Button
            variant="ghost"
            onClick={() => setStep(step - 1)}
            className="w-1/4 m-auto mt-6"
          >
            Previous
          </Button>
        )}
        {step != 5 && (
          <Button
            type="submit"
            onClick={() => setStep(step + 1)}
            className="w-1/4 m-auto mt-6"
          >
            Next
          </Button>
        )}
        {step == 5 && (
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-1/4 m-auto mt-6"
          >
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
