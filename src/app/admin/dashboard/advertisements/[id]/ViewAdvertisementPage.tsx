"use client";

import React from "react";
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
import { Asterisk } from "lucide-react";
import { Label } from "../../../../../components/ui/label";
import { UploadDropzone } from "../../../../../lib/uploadthing";
import { toast } from "sonner";
import { Switch } from "../../../../../components/ui/switch";
import SubmitButton from "../../../../../components/SubmitButton";
import type { z } from "zod";
import { AdvertisementSchema } from "../../../../../zod/Advertisement";
import { useRightSideBar } from "../../../../../store/useRightSideBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAdvertisementById } from "../../../../../hooks/api/advertisement/useGetAdvertisementById";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { updateAdvertisement } from "../../../../../actions/advertisementsAction";

type ViewAdvertisementPageProps = {
  id: string;
};

const ViewAdvertisementPage = ({ id }: ViewAdvertisementPageProps) => {
  const { open } = useRightSideBar();
  const queryClient = useQueryClient();
  // 3. Fetch the advertisement data
  const { data, isLoading, error } = useGetAdvertisementById(id);

  React.useEffect(() => {
    open();
  }, [open]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AdvertisementSchema>>({
    resolver: zodResolver(AdvertisementSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      active: true,
      link: "",
    },
  });

  // 4. Set the form values when the data is fetched
  React.useEffect(() => {
    if (data) {
      form.setValue("title", data?.title ?? "");
      form.setValue("description", data?.description ?? "");
      form.setValue("imageUrl", data?.imageUrl ?? "");
      form.setValue("videoUrl", data?.videoUrl ?? "");
      form.setValue("active", data?.active ?? true);
      form.setValue("link", data?.link ?? "");
    }
  }, [data, form]);

  const { mutate: updateAdvertisementMutation, isPending: isUpdatePending } =
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: z.infer<typeof AdvertisementSchema>;
      }) => updateAdvertisement({ id, data }),
      onSuccess: async (data) => {
        if (data.success) {
          toast.success(data.message);
          await queryClient.invalidateQueries({
            queryKey: ["advertisement", id],
          });
        }
      },
      onError: (error) => {
        console.log("Error updating advertisement", error);
        toast.error(error.message);
      },
    });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AdvertisementSchema>) {
    console.log(values);
    updateAdvertisementMutation({ id, data: values });
  }

  if (isLoading) {
    return (
      <section className={"container mx-auto"}>
        <Skeleton className={"h-full min-h-screen"} />
      </section>
    );
  }

  if (error) {
    return <div className={"container mx-auto"}>Error: {error.message}</div>;
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>Manage Advertisement</CardTitle>
          <CardDescription>
            Manage your advertisement here to promote your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div
                className={"flex w-full flex-col gap-2 lg:flex-row lg:gap-6"}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your advertisement title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your advertisement description
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Link (URL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.example.com/prodcut/1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your advertisement link
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center rounded-lg p-3 shadow-sm">
                <Asterisk className={"size-4 fill-red-500 text-red-500"} />
                <p className={"text-sm text-gray-500"}>
                  You can upload either an image or a video for your
                  advertisement
                </p>
              </div>
              <div className={"flex w-full flex-col gap-2"}>
                <Label>Advertisement Image</Label>
                <div className={"grid grid-cols-3 gap-3"}>
                  <UploadDropzone
                    className={"col-span-2"}
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      form.setValue("imageUrl", res.map((r) => r.url)[0] ?? "");
                      toast.success("Image uploaded successfully");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(error.message);
                    }}
                  />
                  <div className={"col-span-1"}>
                    {data?.imageUrl || form.getValues("imageUrl") ? (
                      <img
                        src={data?.imageUrl ?? form.getValues("imageUrl")}
                        alt="Advertisement Image"
                        className={"h-full w-full rounded-lg object-cover"}
                      />
                    ) : (
                      <div
                        className={
                          "col-span-1 flex h-full w-full items-center justify-center rounded-lg bg-muted"
                        }
                      >
                        <span className={"text-muted-foreground"}>
                          No Image
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={"flex w-full flex-col gap-2"}>
                <Label>Advertisement Video</Label>
                <div className={"grid grid-cols-3 gap-3"}>
                  <UploadDropzone
                    className={"col-span-2"}
                    endpoint={"videoUploader"}
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      form.setValue("videoUrl", res.map((r) => r.url)[0] ?? "");
                      toast.success("Video uploaded successfully");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(error.message);
                    }}
                  />
                  <div className={"col-span-1"}>
                    {data?.videoUrl || form.getValues("videoUrl") ? (
                      <video
                        src={data?.videoUrl ?? form.getValues("videoUrl")}
                        controls={true}
                        className={"h-full w-full rounded-lg"}
                      />
                    ) : (
                      <div
                        className={
                          "col-span-1 flex h-full w-full items-center justify-center rounded-lg bg-muted"
                        }
                      >
                        <span className={"text-muted-foreground"}>
                          No Video
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Activation of Advertisement</FormLabel>
                      <FormDescription>
                        {field.value
                          ? "This Advertisement is Active to customer"
                          : "This Advertisement is Inactive to customer"}
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

              <SubmitButton
                isLoading={isUpdatePending}
                text={"Edit Advertisement"}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default ViewAdvertisementPage;
