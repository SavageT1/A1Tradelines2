import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children }: { children: ReactNode }) { return <div className="min-h-screen overflow-x-hidden bg-transparent font-sans text-foreground"><Header/><main className="bg-[#0a1326] text-white">{children}</main><Footer/></div>; }
