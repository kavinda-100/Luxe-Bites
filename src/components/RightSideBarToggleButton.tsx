"use client";

import React from "react";
import { useRightSideBar } from "../store/useRightSideBar";
import { FiSidebar } from "react-icons/fi";
import { Button } from "./ui/button";

const RightSideBarToggleButton = () => {
  const { toggle } = useRightSideBar();

  return (
    <Button variant={"ghost"} size={"icon"} onClick={toggle}>
      <FiSidebar className={"size-4"} />
    </Button>
  );
};
export default RightSideBarToggleButton;
