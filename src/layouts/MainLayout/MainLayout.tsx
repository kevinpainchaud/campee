import { Outlet } from "react-router";

import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export const MainLayout = () => {
  return (
    <div className="pt-4 md:pt-6">
      <Header className="sticky top-4 z-40 lg:top-6" />
      <main className="py-16 md:py-26">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
