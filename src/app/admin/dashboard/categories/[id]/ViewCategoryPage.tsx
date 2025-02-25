"use client";

import React from "react";
import { useGetCategoryById } from "../../../../../hooks/api/categories/useGetCategoryById";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useRightSideBar } from "../../../../../store/useRightSideBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import SubmitButton from "../../../../../components/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { categoriesSchema } from "../../../../../zod/categories";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

type ViewCategoryPageProps = {
  id: string;
};

const ViewCategoryPage = ({ id }: ViewCategoryPageProps) => {
  const { open } = useRightSideBar();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { data, isLoading, error } = useGetCategoryById(id);

  // open the right sidebar.
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

  // submit handler.
  function onSubmit(values: z.infer<typeof categoriesSchema>) {
    console.log(values);
  }

  // data.
  React.useEffect(() => {
    if (data?.category) {
      form.setValue("name", data.category.name);
      form.setValue("description", data.category.description ?? "");
    }
  }, [data, form]);

  // loading.
  if (isLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full min-h-screen"} />
      </section>
    );
  }

  // error.
  if (error) {
    return <div className={"container mx-auto"}>Error: {error.message}</div>;
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>Manage Category</CardTitle>
          <CardDescription>
            Manage your category here. You can edit or delete your category
            here.
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
              <div className={"flex justify-between gap-3"}>
                {/*edit button */}
                <SubmitButton isLoading={false} text={"Edit Category"} />
                {/* delete button */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>Delete Category</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Category</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this category? This
                        action cannot be undone. 🚨
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <div className={"flex justify-end gap-3"}>
                        <Button
                          variant={"secondary"}
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant={"destructive"}>Delete</Button>
                      </div>
                    </DialogBody>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default ViewCategoryPage;
