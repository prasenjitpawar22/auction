import { Header } from "@/components/widgets/header";
import { Sidebar } from "@/components/widgets/sidebar";
import { Main } from "next/document";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-8 mr-10 mb-8">
        <Header />
        {children}
      </main>
    </div>
  );
}
