import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { AdminSidebarData, UserSidebarData } from "./SidebarData";
import { logout } from "../redux/features/authSlice";
import { isDemoMode } from "../demoMode";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [expanded, setExpanded] = useState(() => {
    return localStorage.getItem("sidebarExpanded") !== "false";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", String(expanded));
  }, [expanded]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setMobileOpen(false);

    if (!isDemoMode) {
      dispatch(logout());
    }

    navigate("/");
  };

  // Show the standard user navigation in demo mode.
  // Real authenticated users retain their role-based navigation.
  const menuItems =
    !isDemoMode && user?.role === "admin" ? AdminSidebarData : UserSidebarData;

  const navigationItems = menuItems.filter((item) => !item.last);

  const renderNavigation = (showLabels) => (
    <>
      <div className="mb-3 px-3">
        {showLabels && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AFC9B5]">
            Workspace
          </p>
        )}
      </div>

      <nav aria-label="Dashboard navigation">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const active = location.pathname === item.link;

            return (
              <li key={item.link}>
                <Link
                  to={item.link}
                  title={!showLabels ? item.title : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-12 items-center gap-4 rounded-xl px-3 py-3 transition-colors ${
                    active
                      ? "bg-[#416C52] text-white"
                      : "text-[#D2E1D4] hover:bg-[#356047] hover:text-white"
                  } ${!showLabels ? "justify-center" : ""}`}
                >
                  <span className="flex shrink-0 items-center text-xl">
                    {item.icon}
                  </span>

                  {showLabels && (
                    <span className="truncate text-sm font-medium">
                      {item.title.trim()}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  const renderLogout = (showLabels) => (
    <button
      type="button"
      onClick={handleLogout}
      title={
        !showLabels ? (isDemoMode ? "Exit preview" : "Log out") : undefined
      }
      className={`flex min-h-12 w-full items-center gap-4 rounded-xl px-3 py-3 text-left text-[#D2E1D4] transition-colors hover:bg-[#356047] hover:text-white ${
        !showLabels ? "justify-center" : ""
      }`}
    >
      <FiLogOut className="shrink-0 text-xl" />

      {showLabels && (
        <span className="text-sm font-medium">
          {isDemoMode ? "Exit preview" : "Log out"}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-50 rounded-xl bg-[#244D3A] p-3 text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col bg-[#244D3A] px-4 py-7 text-white shadow-lg transition-all duration-300 lg:flex ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        <div
          className={`mb-12 flex items-center ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          {expanded ? (
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#416C52] text-2xl">
                🌱
              </div>

              <div>
                <p className="text-base font-semibold">Smart Farming</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#B9D0BD]">
                  Farm management
                </p>
              </div>
            </Link>
          ) : (
            <Link to="/dashboard" title="Smart Farming" className="text-2xl">
              🌱
            </Link>
          )}
        </div>

        <div className="flex-1">{renderNavigation(expanded)}</div>

        <div className="space-y-4 border-t border-[#416C52] pt-5">
          {renderLogout(expanded)}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[#B9D0BD] transition-colors hover:bg-[#356047] hover:text-white ${
              !expanded ? "justify-center" : ""
            }`}
          >
            {expanded ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}

            {expanded && <span className="text-sm">Collapse menu</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#244D3A] px-4 py-7 text-white shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 mt-12 flex items-center gap-3">
          <span className="text-3xl">🌱</span>
          <div>
            <p className="font-semibold">Smart Farming</p>
            <p className="text-xs text-[#B9D0BD]">Farm management</p>
          </div>
        </div>

        <div className="flex-1">{renderNavigation(true)}</div>

        <div className="border-t border-[#416C52] pt-5">
          {renderLogout(true)}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
