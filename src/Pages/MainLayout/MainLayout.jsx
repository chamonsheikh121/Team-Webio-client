import { NavLink, Outlet } from "react-router-dom";
import Footer from "../HomePage/Components/Footer";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import './../../index.css'

const MainLayout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/who_we_are", label: "Who we are" },
    { path: "/projects", label: "Projects" },
    { path: "/services", label: "Services" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle loading and welcome message
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    setTimeout(() => {
      if (!hasVisited) {
        setShowWelcome(true);
        sessionStorage.setItem("visited", "true");
        setTimeout(() => {
          setShowWelcome(false);
          setLoading(false);
        }, 2000); // Show welcome message for 2 seconds
      } else {
        setLoading(false);
      }
    }, 1000); // Initial loading time
  }, []);

  // Show loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-col h-screen bg-white">
        <span className="loader"></span>

      </div>
    );
  }

  // Show welcome screen (only for first-time session)
  if (showWelcome) {
    return (
      <div className="flex items-center justify-center h-screen bg-purple-200">
        <p className="text-3xl font-bold text-gray-800">Welcome!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
              isSticky
                ? "top-0 bg-white/40 shadow-lg backdrop-blur-md"
                : "top-[-80px] bg-transparent"
            }`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 transition-all duration-500">
              <div className="flex-none lg:flex lg:w-1/3">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <ul className="hidden lg:flex menu uppercase menu-horizontal text-lg font-medium transition-all duration-500">
                  {navLinks.map(({ path, label }) => (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        `relative p-2 text-nowrap text-sm text-gray-700 transition-all
                        ${isActive ? "text-purple-800 after:w-full" : "hover:text-gray-900"}`
                      }
                      onClick={() => window.location.href = path}
                    >
                      {label}
                    </NavLink>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center transition-all duration-500">
                  <span className="text-blue-600">Team</span>
                  <span className="ml-1 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Webio
                  </span>
                </div>
              </div>
              <div className="w-1/3 hidden lg:block"></div>
            </div>
          </div>

          {/* Page content */}
          <Outlet />
          <Footer />
        </div>

        {/* Sidebar Drawer */}
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
