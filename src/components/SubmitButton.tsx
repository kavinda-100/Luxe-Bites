import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

type SubmitButtonProps = {
  isLoading: boolean;
  text: string;
  className?: string;
};

const SubmitButton = ({ isLoading, className, text }: SubmitButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className={cn("w-fit", className)}
    >
      {isLoading ? (
        <div className={"flex items-center gap-3"}>
          <Loader2 className={"size-4 animate-spin"} /> wait...
        </div>
      ) : (
        text
      )}
    </Button>
  );
};
export default SubmitButton;
