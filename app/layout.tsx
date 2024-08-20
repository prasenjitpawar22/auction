import type { ReactElement } from "react";
import "@/app/globals.css";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <html>
      <body className={""}>{children}
        <Toaster />
      </body>
    </html>
  );
}
