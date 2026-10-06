"use client";

import { Toaster } from "sonner";

export function AdminToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-right"
      toastOptions={{
        style: {
          background: "#11151B",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
        },
      }}
    />
  );
}
