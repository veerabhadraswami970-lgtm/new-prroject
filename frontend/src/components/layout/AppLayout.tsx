import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar />
      <main className="flex-1 gradient-hero flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
