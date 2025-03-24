"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
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
import { Input } from "../../../../../components/ui/input";
import { useRightSideBar } from "../../../../../store/useRightSideBar";
import { Label } from "../../../../../components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodUserSchema } from "../../../../../zod/user";
import SubmitButton from "../../../../../components/SubmitButton";
import { BanIcon, Loader2, TrashIcon } from "lucide-react";
import { useGetUserByEmail } from "../../../../../hooks/api/users/useGetUserByEmail";
import { useMutation } from "@tanstack/react-query";
import {
  banUserByEmail,
  deleteUserByEmail,
  unbanUserByEmail,
  updateUserByEmail,
} from "../../../../../actions/users";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

const ManageCustomers = () => {
  // Get the email from the URL query params.
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  // open Right sidebar
  const { open } = useRightSideBar();
  // State for the search input.
  const [search, setSearch] = React.useState("");
  // get the user data
  const { user, isUserLoading, userMutate } = useGetUserByEmail();
  // dialog for deleting user
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  // dialog for banning user
  const [isBanDialogOpen, setIsBanDialogOpen] = React.useState(false);
  // ban reason
  const [bannedReason, setBannedReason] = React.useState("");
  // unban dialog
  const [isUnbanDialogOpen, setIsUnbanDialogOpen] = React.useState(false);

  React.useEffect(() => {
    open();
  }, [open]);

  React.useEffect(() => {
    if (email) {
      setSearch(email);
      userMutate(email);
    }
  }, [email, userMutate]);

  const searchUser = () => {
    if (!search) {
      toast.error("Please Enter a valid email");
      return;
    }
    userMutate(search);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof zodUserSchema>>({
    resolver: zodResolver(zodUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // update mutation
  const { mutate: updateUserMutate, isPending: isUpdatingUser } = useMutation({
    mutationFn: async ({
      email,
      data,
    }: {
      email: string;
      data: z.infer<typeof zodUserSchema>;
    }) => updateUserByEmail({ email, data }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("User updated successfully");
      }
    },
    onError: (error) => {
      console.log("Error updating user", error);
      toast.error(error.message);
    },
  });

  // delete mutation
  const { mutate: deleteUserMutate, isPending: isDeletingUser } = useMutation({
    mutationFn: async (email: string) => deleteUserByEmail(email),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("User deleted successfully");
        setIsDeleteDialogOpen(false);
      }
    },
    onError: (error) => {
      console.log("Error deleting user", error);
      toast.error(error.message);
      setIsDeleteDialogOpen(false);
    },
  });

  // ban mutation
  const { mutate: banUserMutate, isPending: isBanningUser } = useMutation({
    mutationFn: async ({
      email,
      bannedReason,
    }: {
      email: string;
      bannedReason: string;
    }) => banUserByEmail({ email, bannedReason }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("User banned successfully");
        setIsBanDialogOpen(false);
        window.location.reload();
      }
    },
    onError: (error) => {
      console.log("Error banning user", error);
      toast.error(error.message);
      setIsBanDialogOpen(false);
    },
  });

  // unban mutation
  const { mutate: unbanUserMutate, isPending: isUnbanningUser } = useMutation({
    mutationFn: async (email: string) => unbanUserByEmail(email),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("User unbanned successfully");
        setIsUnbanDialogOpen(false);
        window.location.reload();
      }
    },
    onError: (error) => {
      console.log("Error unbanning user", error);
      toast.error(error.message);
      setIsUnbanDialogOpen(false);
    },
  });

  // set the user data to the form
  React.useEffect(() => {
    if (user) {
      form.setValue("name", user?.name ?? "");
      form.setValue("email", user?.email ?? "");
      form.setValue(
        "role",
        user?.role && user?.role === "ADMIN" ? "ADMIN" : "USER",
      );
    }
  }, [user, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodUserSchema>) {
    console.log(values);
    if (!search) {
      toast.error("Please search for a user first");
      return;
    }
    updateUserMutate({ email: search, data: values });
  }

  // delete user function
  function deleteUser() {
    if (!search) {
      toast.error("Please search for a user first");
      return;
    }
    deleteUserMutate(search);
  }

  // ban user function
  function banUser() {
    if (!search) {
      toast.error("Please search for a user first");
      return;
    }
    if (!bannedReason || bannedReason.trim() === "") {
      setBannedReason("No reason");
    }
    banUserMutate({ email: search, bannedReason });
  }

  // unban user function
  function unbanUser() {
    if (!search) {
      toast.error("Please search for a user first");
      return;
    }
    unbanUserMutate(search);
  }

  return (
    <section className={"container mx-auto"}>
      <Card className={"shadow-sm"}>
        <CardHeader>
          <CardTitle>Manage Customers</CardTitle>
          <CardDescription>
            {email
              ? `Editing customer: ${email}`
              : "Search for a customer to manage"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* search user */}
          <div className={"flex flex-col space-y-2"}>
            <Label htmlFor="search" className={"text-muted-foreground"}>
              Search by user email
            </Label>
            <div className={"flex items-center gap-3"}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button disabled={isUserLoading} onClick={searchUser}>
                Search
              </Button>
            </div>
          </div>

          {/*  user data */}
          <div className={"mt-8 w-full"}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className={"grid grid-cols-1 gap-6 lg:grid-cols-2"}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={"flex justify-between gap-3"}>
                  <SubmitButton isLoading={isUpdatingUser} text={"Edit User"} />

                  <div className={"flex justify-end gap-3"}>
                    {/* delete button */}
                    <Dialog
                      open={isDeleteDialogOpen}
                      onOpenChange={setIsDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <TrashIcon className={"size-4"} />
                          Delete User
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete User 🚨 </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this User? This
                            action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogBody>
                          <div className={"flex justify-end gap-3"}>
                            <Button
                              type={"button"}
                              variant={"secondary"}
                              onClick={() => setIsDeleteDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type={"button"}
                              variant={"destructive"}
                              onClick={deleteUser}
                              disabled={isDeletingUser}
                            >
                              {isDeletingUser ? (
                                <Loader2 className={"size-3 animate-spin"} />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </div>
                        </DialogBody>
                      </DialogContent>
                    </Dialog>

                    {/* ban button */}
                    {user?.banned ? (
                      <Dialog
                        open={isUnbanDialogOpen}
                        onOpenChange={setIsUnbanDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button>
                            <BanIcon className={"size-4"} />
                            Unban User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Unban User 🚨 </DialogTitle>
                            <DialogDescription>
                              Are you sure you want to Unban this User?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogBody>
                            <div className={"mt-3 flex justify-end gap-3"}>
                              <Button
                                type={"button"}
                                variant={"secondary"}
                                onClick={() => setIsUnbanDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type={"button"}
                                onClick={unbanUser}
                                disabled={isUnbanningUser}
                              >
                                {isUnbanningUser ? (
                                  <Loader2 className={"size-3 animate-spin"} />
                                ) : (
                                  "Unban"
                                )}
                              </Button>
                            </div>
                          </DialogBody>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog
                        open={isBanDialogOpen}
                        onOpenChange={setIsBanDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="destructive">
                            <BanIcon className={"size-4"} />
                            Ban User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ban User 🚨 </DialogTitle>
                            <DialogDescription>
                              Are you sure you want to Ban this User?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogBody>
                            <Input
                              placeholder={"Reason for banning"}
                              value={bannedReason}
                              onChange={(e) => setBannedReason(e.target.value)}
                            />
                            <div className={"mt-3 flex justify-end gap-3"}>
                              <Button
                                type={"button"}
                                variant={"secondary"}
                                onClick={() => setIsBanDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type={"button"}
                                variant={"destructive"}
                                onClick={banUser}
                                disabled={isBanningUser}
                              >
                                {isBanningUser ? (
                                  <Loader2 className={"size-3 animate-spin"} />
                                ) : (
                                  "Ban"
                                )}
                              </Button>
                            </div>
                          </DialogBody>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default ManageCustomers;
