import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { cookies } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Unauthorized from "../../unauthorized/page";
import { checkUserRole } from "../../../actions/AuthActions";
import { redirect } from "next/navigation";
import { ModeToggle } from "../../../components/ModeToggle";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  // auth check
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <Unauthorized post_login_redirect_url={"/admin/dashboard"} />;
  }
  // check user role
  const role = await checkUserRole(user.id);
  if (role === null) {
    return <Unauthorized post_login_redirect_url={"/admin/dashboard"} />;
  }
  // check if user is admin
  if (role !== "ADMIN") {
    return redirect("/error?message=Unauthorized-Access Denied");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className={"container mx-auto p-2"}>
        <div className={"mb-2 flex w-full items-center justify-between"}>
          <SidebarTrigger />
          <ModeToggle size={"xm"} />
        </div>
        <div className={"flex w-full gap-3 lg:w-5/6"}>
          {children}
          <div className={"hidden lg:block lg:w-1/6"}>Notifications</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
