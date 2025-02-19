import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { cn } from "../../lib/utils";

type StatusMessageProps = {
  message: string;
  type: "success" | "error" | "warning";
};

const StatusMessage = ({ message, type }: StatusMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-[400px] items-center gap-3 text-pretty rounded-md border px-3 py-2 font-medium",
        {
          "border-emerald-500/50 bg-emerald-100/80 text-emerald-500":
            type === "success",
          "border-red-500/50 bg-red-100/80 text-red-500": type === "error",
          "border-yellow-500/50 bg-yellow-100/80 text-yellow-500":
            type === "warning",
        },
      )}
    >
      {
        {
          success: <CiCircleCheck className={"size-5 text-emerald-500"} />,
          error: <MdErrorOutline className={"size-5 text-red-500"} />,
          warning: <CiWarning className={"size-5 text-yellow-500"} />,
        }[type]
      }
      {message}
    </div>
  );
};
export default StatusMessage;
