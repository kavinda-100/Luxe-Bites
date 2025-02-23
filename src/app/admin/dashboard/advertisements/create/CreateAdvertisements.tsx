"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../../../../../components/SubmitButton";
import { AdvertisementSchema } from "../../../../../zod/Advertisement";
import { Switch } from "../../../../../components/ui/switch";
import { Label } from "../../../../../components/ui/label";
import { UploadDropzone } from "../../../../../lib/uploadthing";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdvertisement } from "../../../../../actions/advertisementsAction";
import { useRightSideBar } from "../../../../../store/useRightSideBar";

const CreateAdvertisements = () => {
  const { open } = useRightSideBar();
  const queryClient = useQueryClient();

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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AdvertisementSchema>) =>
      createAdvertisement(data),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        form.reset();
        await queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AdvertisementSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"mx-auto w-full max-w-6xl border-none shadow-sm"}>
        <CardHeader>
          <CardTitle>Create Advertisement</CardTitle>
          <CardDescription>
            Create a new advertisement to promote your products
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
                <UploadDropzone
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
              </div>

              <div className={"flex w-full flex-col gap-2"}>
                <Label>Advertisement Video</Label>
                <UploadDropzone
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
                isLoading={isPending}
                text={"Create Advertisement"}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default CreateAdvertisements;
