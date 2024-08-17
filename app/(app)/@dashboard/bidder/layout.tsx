import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="bg-red-400"> {children} </div>;
}
