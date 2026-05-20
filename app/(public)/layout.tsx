import { LenisProvider } from "@/components/providers/LenisProvider";
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
        <footer>
          <p>&copy; 2023 My Site</p>
        </footer>
      </LenisProvider>
    </div>
  );
};

export default Layout;
