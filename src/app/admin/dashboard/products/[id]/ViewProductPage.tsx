"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRightSideBar } from "../../../../../store/useRightSideBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useGetAllCategories } from "../../../../../hooks/api/categories/useGetAllCategories";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../../../zod/products";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { CirclePlus, Loader2, TrashIcon } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Label } from "../../../../../components/ui/label";
import { UploadDropzone } from "../../../../../lib/uploadthing";
import { Switch } from "../../../../../components/ui/switch";
import SubmitButton from "../../../../../components/SubmitButton";
import { useGetProductById } from "../../../../../hooks/api/products/useGetProductById";
import Image from "next/image";
import { updateProduct } from "../../../../../actions/products";
import { useDeleteProducts } from "../../../../../hooks/api/products/useDeleteProducts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

type ViewProductPageProps = {
  id: string;
};

const ViewProductPage = ({ id }: ViewProductPageProps) => {
  const router = useRouter();
  // open the right sidebar.
  const { open } = useRightSideBar();
  // use the query client
  const queryClient = useQueryClient();
  // get the selected category
  const { data, isLoading, error } = useGetAllCategories();
  // get the product by id
  const {
    data: product,
    isLoading: isProductLoading,
    error: isProductError,
  } = useGetProductById(id);
  // delete the product mutation
  const { deleteProductsMutate, isDeleteProductsPending } = useDeleteProducts();
  // dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // open the right sidebar.
  React.useEffect(() => {
    open();
  }, [open]);

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

  // update the product mutation
  const { mutate: updateProductMutation, isPending: isUpdateProductPending } =
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: z.infer<typeof productSchema>;
      }) => updateProduct({ id, data }),
      onSuccess: async (data) => {
        if (data.success) {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: ["product", id] });
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  // delete the product mutation
  const handleDeleteProduct = () => {
    deleteProductsMutate(id, {
      onSuccess: () => {
        setDialogOpen(false);
        router.push("/admin/dashboard/products");
      },
      onError: () => {
        setDialogOpen(false);
      },
    });
  };

  // set the product data to the form
  React.useEffect(() => {
    if (!isProductLoading && !isProductError) {
      form.setValue("name", product?.name ?? "");
      form.setValue("description", product?.description ?? "");
      form.setValue("price", product?.price.toString() ?? "0");
      form.setValue("stock", product?.stock.toString() ?? "0");
      form.setValue("image", product?.image ?? "");
      form.setValue("categoryId", product?.categoryId ?? "");
      form.setValue("active", product?.active ?? true);
      form.setValue("discount", product?.discount?.toString() ?? "0");
    }
  }, [isProductLoading, isProductError, product, form]);

  // if the product is loading, show a skeleton
  if (isProductLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full min-h-screen"} />
      </section>
    );
  }
  // if the product is not found, show an cancel
  if (isProductError) {
    router.push(`/error?message=${isProductError.message}`);
  }

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
    // check if the category is selected
    if (!values.categoryId) {
      toast.error("Please select a category");
      return;
    }
    updateProductMutation({ id, data: values });
  }

  // loading.
  if (isLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full min-h-screen"} />
      </section>
    );
  }

  // cancel.
  if (error) {
    return <div className={"container mx-auto"}>Error: {error.message}</div>;
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>Manage Product</CardTitle>
          <CardDescription>
            You can edit the product details here.
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
                              <SelectValue
                                placeholder={
                                  product?.categoryName ??
                                  "Select a the category"
                                }
                              />
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
                <div className={"grid grid-cols-3 gap-3"}>
                  <UploadDropzone
                    className={"col-span-2"}
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
                  {isProductLoading ? (
                    <Skeleton
                      className={
                        "col-span-1 flex h-full w-full flex-col items-center justify-center"
                      }
                    >
                      <Loader2
                        className={"size-4 animate-spin text-muted-foreground"}
                      />
                    </Skeleton>
                  ) : form.getValues("image") || product?.image ? (
                    <Image
                      src={product?.image ?? form.getValues("image")}
                      alt="product"
                      width={100}
                      height={100}
                      className={
                        "col-span-1 h-full w-full rounded-lg object-cover"
                      }
                    />
                  ) : (
                    <div
                      className={
                        "col-span-1 flex h-full w-full items-center justify-center rounded-lg bg-muted"
                      }
                    >
                      <span className={"text-muted-foreground"}>No Image</span>
                    </div>
                  )}
                </div>
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

              <div className={"flex justify-between gap-3"}>
                {/*edit button */}
                <SubmitButton
                  isLoading={isUpdateProductPending}
                  text={"Edit Product"}
                />
                {/* delete button */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>
                      <TrashIcon className={"size-4"} />
                      Delete Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Product 🚨 </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this Product? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <div className={"flex justify-end gap-3"}>
                        <Button
                          type={"button"}
                          variant={"secondary"}
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type={"button"}
                          variant={"destructive"}
                          onClick={handleDeleteProduct}
                          disabled={isDeleteProductsPending}
                        >
                          {isDeleteProductsPending ? (
                            <Loader2 className={"size-3 animate-spin"} />
                          ) : (
                            "Delete"
                          )}
                        </Button>
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
export default ViewProductPage;
