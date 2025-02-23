import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { cookies } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Unauthorized from "../../unauthorized/page";
import { checkUserRole } from "../../../actions/AuthActions";
import { redirect } from "next/navigation";
import { ModeToggle } from "../../../components/ModeToggle";
import RightSideBar from "./RightSideBar";
import RightSideBarToggleButton from "../../../components/RightSideBarToggleButton";

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
        <div className={"mb-2 flex items-center justify-between"}>
          <SidebarTrigger />
          <div className={"flex items-center gap-3"}>
            <ModeToggle size={"xm"} />
            <RightSideBarToggleButton />
          </div>
        </div>
        <RightSideBar>{children}</RightSideBar>
      </main>
    </SidebarProvider>
  );
}
