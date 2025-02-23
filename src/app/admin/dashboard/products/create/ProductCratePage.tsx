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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "../../../../../components/SubmitButton";
import { Textarea } from "../../../../../components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { productSchema } from "../../../../../zod/products";
import { UploadDropzone } from "../../../../../lib/uploadthing";
import { toast } from "sonner";
import { Label } from "../../../../../components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../../../../actions/products";
import { CirclePlus } from "lucide-react";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useGetAllCategories } from "../../../../../hooks/api/categories/useGetAllCategories";

const ProductCratePage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      stock: "0",
      image: "",
      categoryId: "",
      active: true,
      discount: "0",
    },
  });

  // get the selected category
  const { data, isLoading, error } = useGetAllCategories();

  // mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof productSchema>) => createProduct(data),
    onSuccess: (data) => {
      toast.success(data.message);
      form.setValue("name", "");
      form.setValue("description", "");
      form.setValue("price", "0");
      form.setValue("stock", "0");
      form.setValue("discount", "0");
      form.setValue("image", "");
      form.setValue("active", true);
      //! can't reset the entire form using from.reset() because it's resting select value to null
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    // check if the stock, price and discount is a number
    if (
      isNaN(parseInt(values.stock)) ||
      isNaN(parseFloat(values.price)) ||
      (values.discount && isNaN(parseFloat(values.discount)))
    ) {
      toast.error("Stock, Price and Discount should be a number");
      return;
    }
    // check stock, price and discount is not negative or zero
    if (
      parseInt(values.stock) <= 0 ||
      parseFloat(values.price) <= 0 ||
      (values.discount && parseFloat(values.discount) < 0)
    ) {
      toast.error("Stock, Price and Discount should be greater than zero");
      return;
    }
    mutate(values);
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Fill in the form below to create a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="!w-full space-y-4"
            >
              <div className={"w-full"}>
                {isLoading && <Skeleton className={"h-8 w-full"} />}
                {error && (
                  <div className={"w-full rounded-md border p-2"}>
                    <p className={"text-sm font-medium text-red-500"}>
                      Error loading categories
                    </p>
                  </div>
                )}
                {!isLoading && !error && (
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a the category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={"max-h-[300px] w-full overflow-y-auto"}
                          >
                            {data?.categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                <span className={"flex items-center gap-2"}>
                                  <CirclePlus
                                    className={"size-3 text-muted-foreground"}
                                  />
                                  {category.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can select the category of the product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div
                className={"flex w-full flex-col gap-2 lg:flex-row lg:gap-6"}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your product name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your product stock.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={"flex w-full flex-col gap-2 lg:flex-row lg:gap-6"}
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your product price.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the discount of the product. (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className={"w-full"}>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={"flex w-full flex-col gap-2"}>
                <Label>Product Image</Label>
                <UploadDropzone
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    form.setValue("image", res.map((r) => r.url)[0] ?? "");
                    toast.success("Image uploaded successfully");
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(error.message);
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Activation of Product</FormLabel>
                      <FormDescription>
                        {field.value
                          ? "This product is Active to customer"
                          : "This product is Inactive to customer"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <SubmitButton isLoading={isPending} text={"Create Product"} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default ProductCratePage;
