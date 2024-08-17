import type { ReactElement } from "react";
import "@/app/globals.css";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <html>
      <body className={""}>{children}</body>
    </html>
  );
}
