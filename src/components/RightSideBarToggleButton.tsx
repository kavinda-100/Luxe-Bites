"use client";

import React from "react";
import { useRightSideBar } from "../store/useRightSideBar";
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { Button } from "./ui/button";

const RightSideBarToggleButton = () => {
  const { toggle, isOpen } = useRightSideBar();

  return (
    <Button variant={"ghost"} size={"icon"} onClick={toggle}>
      {isOpen ? <ToggleLeftIcon /> : <ToggleRightIcon />}
    </Button>
  );
};
export default RightSideBarToggleButton;
