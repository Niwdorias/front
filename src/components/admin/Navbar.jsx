import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { handleLogout } = useAuth();
  return (
    <nav className="w-48 min-h-screen bg-second border-r border-gray-500 flex flex-col justify-between">
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul className="pl-5">
          <li className="mb-8">
            <Link to="/">
              <i className="bi bi-stars h-14 p-2 font-bold text-gray-100 text-2xl">
                5 Movie
              </i>
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <i className="bi bi-house-door"></i>
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <i className="bi bi-film"></i>
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <i className="bi bi-person-square"></i>
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>

        <div className="flex flex-col items-start p-5">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <i className="bi bi-box-arrow-right text-2xl p-2"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
