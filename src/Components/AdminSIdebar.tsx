import React, { useState } from "react";
import {
  LayoutDashboard,
  Vote,
  Users,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Plus,
  Clock,
  History,
  UserCheck,
  Search,
  Download,
  TrendingUp,
  PieChart,
  Shield,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// ===== MENU ITEM TYPE =====
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["elections"]);

  // ===== MENU ITEMS =====
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin/dashboard",
    },
    {
      id: "elections",
      label: "Elections",
      icon: <Vote className="w-5 h-5" />,
      badge: 3,
      subItems: [
        {
          id: "create-election",
          label: "Create New",
          icon: <Plus className="w-4 h-4" />,
          path: "/admin/elections/create",
        },
        {
          id: "ongoing",
          label: "Ongoing",
          icon: <Clock className="w-4 h-4" />,
          path: "/admin/elections/ongoing",
          badge: 2,
        },
        {
          id: "scheduled",
          label: "Scheduled",
          icon: <History className="w-4 h-4" />,
          path: "/admin/elections/scheduled",
          badge: 1,
        },
        {
          id: "past",
          label: "Past Elections",
          icon: <History className="w-4 h-4" />,
          path: "/admin/elections/past",
        },
      ],
    },
    {
      id: "voters",
      label: "Voters",
      icon: <Users className="w-5 h-5" />,
      badge: 12,
      subItems: [
        {
          id: "approve-voters",
          label: "Approve Registrations",
          icon: <UserCheck className="w-4 h-4" />,
          path: "/admin/voters/approve",
          badge: 12,
        },
        {
          id: "all-voters",
          label: "All Voters",
          icon: <Users className="w-4 h-4" />,
          path: "/admin/voters/all",
        },
        // {
        //   id: "search-voters",
        //   label: "Search Voters",
        //   icon: <Search className="w-4 h-4" />,
        //   path: "/admin/voters/search",
        // },
        {
          id: "export-voters",
          label: "Export List",
          icon: <Download className="w-4 h-4" />,
          path: "/admin/voters/export",
        },
      ],
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: <Trophy className="w-5 h-5" />,
      badge: 5,
      subItems: [
        {
          id: "approve-candidates",
          label: "Approve Candidates",
          icon: <UserCheck className="w-4 h-4" />,
          path: "/admin/candidates/approve",
          badge: 5,
        },
        {
          id: "all-candidates",
          label: "All Candidates",
          icon: <Trophy className="w-4 h-4" />,
          path: "/admin/candidates/all",
        },
        {
          id: "positions",
          label: "Manage Positions",
          icon: <Shield className="w-4 h-4" />,
          path: "/admin/candidates/positions",
        },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      subItems: [
        {
          id: "voter-turnout",
          label: "Voter Turnout",
          icon: <TrendingUp className="w-4 h-4" />,
          path: "/admin/analytics/turnout",
        },
        {
          id: "results-analysis",
          label: "Results Analysis",
          icon: <PieChart className="w-4 h-4" />,
          path: "/admin/analytics/results",
        },
        {
          id: "demographics",
          label: "Demographics",
          icon: <BarChart3 className="w-4 h-4" />,
          path: "/admin/analytics/demographics",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ];

  // ===== TOGGLE MENU EXPANSION =====
  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  // ===== HANDLE MENU CLICK =====
  const handleMenuClick = (menuId: string, path?: string) => {
    setActiveMenu(menuId);
    if (path) {
      navigate(path);
      setIsMobileOpen(false); // Close mobile menu on navigation
    }
  };

  // Notify layout about sidebar open/close so main content can respond
  React.useEffect(() => {
    try {
      const ev = new CustomEvent('sidebar:change', { detail: { open: isSidebarOpen } });
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
                    Admin Panel
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
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* ===== MENU ITEMS ===== */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                {/* Main Menu Item */}
                <button
                  onClick={() => {
                    if (item.subItems) {
                      toggleMenu(item.id);
                    } else {
                      handleMenuClick(item.id, item.path);
                    }
                  }}
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
                      <span className="font-semibold text-sm">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {isSidebarOpen && (
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`
                          px-2 py-0.5 rounded-full text-xs font-bold
                          ${
                            activeMenu === item.id
                              ? "bg-white/20 text-white"
                              : "bg-red-500 text-white"
                          }
                        `}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.subItems && (
                        <ChevronDown
                          className={`
                            w-4 h-4 transition-transform duration-200
                            ${
                              expandedMenus.includes(item.id)
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      )}
                    </div>
                  )}
                </button>

                {/* Sub Menu Items */}
                {item.subItems &&
                  expandedMenus.includes(item.id) &&
                  isSidebarOpen && (
                    <div className="mt-1 ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() =>
                            handleMenuClick(subItem.id, subItem.path)
                          }
                          className={`
                          w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm
                          ${
                            activeMenu === subItem.id
                              ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }
                        `}
                        >
                          <div className="flex items-center gap-3">
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </div>
                          {subItem.badge && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>

          {/* ===== USER PROFILE SECTION ===== */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {isSidebarOpen ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {(user?.fullName &&
                      user.fullName.charAt(0).toUpperCase()) ||
                      "A"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
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

export default AdminSidebar;
