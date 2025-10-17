// Simple toast implementation to replace Sonner
import * as React from "react";
import { toast as toastFn } from "@/hooks/use-toast";

export const Toaster = () => null;

export const toast = {
  success: (message: string) => {
    toastFn({
      title: "Success",
      description: message,
      variant: "default",
    });
  },
  error: (message: string) => {
    toastFn({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  },
  message: (message: string) => {
    toastFn({
      description: message,
      variant: "default",
    });
  },
};
