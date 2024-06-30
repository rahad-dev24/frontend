"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOGIN_MUTATION } from "./gql/mutation/LoginMutation";
import { schema } from "./gql/mutation/LoginSchema";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";

const Login = () => {
  //form state and resolver
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //mutation
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  // Handle form submission here
  function onSubmit(values: z.infer<typeof schema>) {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  }

  //redirect after login
  if (data) {
    redirect("/dashboard");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-96 p-8 m-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
            <Button type="submit" className="w-1/2 m-auto mt-6">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="m-auto">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
