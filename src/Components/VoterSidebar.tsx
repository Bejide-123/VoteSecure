import React, { useState } from "react";
import { Home, Vote, History, User, LogOut, Menu, X, Settings2, PanelsTopLeft, ChartColumnBig} from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// ===== MENU ITEM TYPE =====
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const VoterSidebar: React.FC = () => {
  const { user, logout } = useAuth();

// // ADD THIS DEBUG CODE:
// console.log('🔍 User data in sidebar:', user);
// console.log('🔍 Full name:', user?.fullName);
// console.log('🔍 Organization:', user?.organization);
// console.log('🔍 Member ID:', user?.memberId);

  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // ===== MENU ITEMS =====
  const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    path: "/voter/dashboard",
  },
  {
    id: "elections",
    label: "Elections",
    icon: <Vote className="w-5 h-5" />,
    path: "/voter/elections",
    badge: 3,
  },
  {
    id: "applications",
    label: "Applications",
    icon: <PanelsTopLeft className="w-5 h-5" />,
    path: "/voter/applications",
  },
  {
    id: "my-votes",
    label: "My Votes",
    icon: <History className="w-5 h-5" />,
    path: "/voter/my-votes",
  },
  {
    id: "results",
    label: "Results",
    icon: <ChartColumnBig className="w-5 h-5" />,
    path: "/voter/results",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    path: "/voter/profile",
  },
  {
    id: "settings",
    label: "User Settings",
    icon: <Settings2 className="w-5 h-5" />,
    path: "/voter/settings",
  }
];

  // ===== HANDLE MENU CLICK =====
  const handleMenuClick = (menuId: string, path: string) => {
    setActiveMenu(menuId);
    navigate(path);
    setIsMobileOpen(false); // Close mobile menu on navigation
  };

  // Sync active menu with current location
  React.useEffect(() => {
    const path = location.pathname;
    const match = menuItems.find((m) => {
      // match exact path or when current path starts with the menu path
      return path === m.path || path.startsWith(m.path + '/') || path.startsWith(m.path);
    });
    if (match) setActiveMenu(match.id);
  }, [location.pathname]);

  // Notify layout about sidebar open/close so main content can respond
  React.useEffect(() => {
    try {
      const ev = new CustomEvent("sidebar:change", {
        detail: { open: isSidebarOpen },
      });
      window.dispatchEvent(ev);
    } catch (err) {
      // ignore in environments that don't support CustomEvent
    }
  }, [isSidebarOpen]);

  return (
    <>
      {/* ===== MOBILE MENU BUTTON (Only show when sidebar is closed on mobile) ===== */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar"
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      )}

      {/* ===== MOBILE OVERLAY ===== */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-68" : "w-20"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* ===== LOGO SECTION ===== */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg blur opacity-50" />
                  <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
                    <Vote
                      onClick={() => {
                        console.log("Clicked");
                        setIsSidebarOpen(true);
                      }}
                      className="w-5 h-5 text-white"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    VoteSecure
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Voter Portal
                  </p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsSidebarOpen(true)}
                className="relative mx-auto cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg blur opacity-50" />
                <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
                  <Vote className="w-5 h-5 text-white" />
                </div>
              </div>
            )}

            {/* Desktop toggle + Mobile close button */}
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 hidden text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close sidebar"
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* ===== MENU ITEMS ===== */}
          <nav className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    activeMenu === item.id
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                  ${!isSidebarOpen && "justify-center"}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {isSidebarOpen && (
                    <span className="font-semibold text-sm">{item.label}</span>
                  )}
                </div>

                {isSidebarOpen && item.badge && (
                  <span
                    className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${
                      activeMenu === item.id
                        ? "bg-white/20 text-white"
                        : "bg-blue-500 text-white"
                    }
                  `}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* ===== USER PROFILE SECTION ===== */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {isSidebarOpen ? (
              <div className="space-y-3">
                {/* User Info Card */}
                <div onClick={() => {
                  navigate("/voter/profile")
                }} className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold shrink-0">
                      <img className="rounded-full" src={user?.selfieUrl} alt="user-image" />  
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {user?.organization}
                      </p>
                    </div>
                  </div>

                  {/* Member ID */}
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Member ID
                    </p>
                    <p className="text-xs font-mono font-semibold text-gray-900 dark:text-white">
                      {user?.memberId}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 mx-auto" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default VoterSidebar;
