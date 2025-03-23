"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

const NotificationSection = () => {
  return (
    <Card
      className={
        "h-full w-3/12 max-w-[300px] shadow-sm transition-all duration-200 ease-linear"
      }
    >
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
export default NotificationSection;
