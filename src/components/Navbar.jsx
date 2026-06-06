import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    [
      "caption transition duration-300 hover:text-white",
      isActive ? "text-white" : "text-[#999999]",
    ].join(" ");

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black/55 backdrop-blur-md">
      <nav className="relative mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 sm:px-6 md:px-10">
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/calculator" className={getLinkClass}>
            Calculator
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="caption text-[#999999] transition hover:text-white md:hidden"
        >
          Menu
        </button>

        <Link
          to="/"
          onClick={closeMenu}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 sm:gap-3"
        >
          <img
            src="/image/2.png"
            alt="MathDash Logo"
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          />

          <span className="wordmark text-white">MATHDASH</span>
        </Link>

        <Link
          to="/calculator"
          onClick={closeMenu}
          className="caption text-[#999999] transition duration-300 hover:text-white"
        >
          Start
        </Link>
      </nav>

      {isOpen && (
        <div className="border-t border-[#262626] bg-black px-5 py-5 md:hidden">
          <div className="mx-auto grid max-w-[1280px] gap-4">
            <NavLink to="/" onClick={closeMenu} className={getLinkClass}>
              Home
            </NavLink>

            <NavLink
              to="/calculator"
              onClick={closeMenu}
              className={getLinkClass}
            >
              Calculator
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}