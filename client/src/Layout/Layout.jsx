import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   <>
  <div className="overflow-x-hidden">
    <Navbar />
    <main className="min-h-[80vh]">
      <Outlet />
    </main>
    <Footer />
  </div>
</>

  );
};

export default Layout;
