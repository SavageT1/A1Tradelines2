import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children }: { children: ReactNode }) { return <div className="min-h-screen overflow-x-hidden bg-[#f8f8f6] font-sans text-[#101b33]"><Header /><main>{children}</main><Footer /></div>; }
