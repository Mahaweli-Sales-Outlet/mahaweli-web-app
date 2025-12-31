import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

interface AdminNavProps {
  user: any;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({
  user,
  onLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const location = useLocation();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:inline">
              Admin Panel
            </span>
          </Link>
          {/* Desktop Admin Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/admin/dashboard"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                location.pathname === "/admin/dashboard"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                location.pathname.includes("/admin/products")
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="w-4 h-4" />
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                location.pathname === "/admin/orders"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </Link>
            <Link
              to="/admin/analytics"
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                location.pathname === "/admin/analytics"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Link>
          </div>
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-green-500 transition-colors"
            >
              View Store
            </Link>
            {user && (
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <span>X</span> : <span>≡</span>}
          </button>
        </div>
        {/* Mobile Admin Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                location.pathname === "/admin/dashboard"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                location.pathname.includes("/admin/products")
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="w-4 h-4" />
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                location.pathname === "/admin/orders"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </Link>
            <Link
              to="/admin/analytics"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                location.pathname === "/admin/analytics"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Link>
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-green-500"
              >
                View Store
              </Link>
              {user && (
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-red-500"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;
