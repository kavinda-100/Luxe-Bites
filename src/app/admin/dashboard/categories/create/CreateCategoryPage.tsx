"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Textarea } from "../../../../../components/ui/textarea";
import { categoriesSchema } from "../../../../../zod/categories";
import StatusMessage from "../../../../../components/status/StatusMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../../../../actions/categoryAction";
import { useStatusHook } from "../../../../../hooks/useStatusHook";
import SubmitButton from "../../../../../components/SubmitButton";
import ResentCategories from "./ResentCategories";
import { useRightSideBar } from "../../../../../store/useRightSideBar";

const CreateCategoryPage = () => {
  const { open } = useRightSideBar();
  const queryClient = useQueryClient();
  const { setErrorMessage, setSuccessMessage, successMessage, errorMessage } =
    useStatusHook();

  React.useEffect(() => {
    open();
  }, [open]);

  // form.
  const form = useForm<z.infer<typeof categoriesSchema>>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // mutation.
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof categoriesSchema>) =>
      createCategory(data),
    onSuccess: async (data) => {
      if (data.success) {
        setSuccessMessage(data.message);
        setErrorMessage(null);
        form.reset();
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },
    onError: (error) => {
      setSuccessMessage(null);
      setErrorMessage(error.message);
    },
  });

  // submit handler.
  function onSubmit(values: z.infer<typeof categoriesSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <section className={"container mx-auto flex flex-col space-y-4"}>
      <Card className={"mx-auto w-full max-w-6xl shadow-sm"}>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
          <CardDescription>
            Create a new category to organize your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your category name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your category description (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && (
                <StatusMessage message={errorMessage} type={"error"} />
              )}
              {successMessage && (
                <StatusMessage message={successMessage} type={"success"} />
              )}
              <SubmitButton isLoading={isPending} text={"Create Category"} />
            </form>
          </Form>
        </CardContent>
      </Card>

      <ResentCategories />
    </section>
  );
};
export default CreateCategoryPage;
