// components/ui/custom-toaster.tsx
"use client";

import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1f2937", // gray-800
          color: "#ffffff",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        },
        success: {
          iconTheme: {
            primary: "#10b981", // green-500
            secondary: "#064e3b", // green-900
          },
          style: {
            background: "#064e3b",
            color: "#d1fae5",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#7f1d1d", // red-900
          },
          style: {
            background: "#7f1d1d",
            color: "#fee2e2",
          },
        },
      }}
    />
  );
}
