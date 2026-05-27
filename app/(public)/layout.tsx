import { LenisProvider } from "@/components/providers/LenisProvider";
import { Footer } from "@/components/public/Footer";
import { Nav } from "@/components/public/Nav/Nav";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Header or top bar */}
      <LenisProvider>
        <Nav />

        {/* Main content area */}
        <main>{children}</main>

        {/* Footer */}
        <Footer></Footer>
      </LenisProvider>
    </div>
  );
};

export default Layout;
