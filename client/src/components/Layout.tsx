import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children }: { children: ReactNode }) { return <div className="min-h-screen overflow-x-hidden bg-[#f4f5f7] font-sans text-[#12213f]"><Header/><main>{children}</main><Footer/></div>; }
