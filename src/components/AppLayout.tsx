import { ReactNode } from "react";
import BottomNav from "./BottomNav";

const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background max-w-lg mx-auto relative">
    <main className="pb-24 px-5 pt-6">{children}</main>
    <BottomNav />
  </div>
);

export default AppLayout;
