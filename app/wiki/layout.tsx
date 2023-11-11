import Sidebar from "@/app/components/Sidebar";

import { LayoutProps } from "@/.next/types/app/layout";

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidebar />
      <main className="pl-64">{children}</main>
    </div>
  );
}
