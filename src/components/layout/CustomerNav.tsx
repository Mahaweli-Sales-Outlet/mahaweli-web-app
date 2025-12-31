import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Leaf,
  LayoutDashboard,
  User as UserIcon,
  ShoppingCart,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

interface CustomerNavProps {
  user: any;
  cartItemsCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const CustomerNav: React.FC<CustomerNavProps> = ({
  user,
  cartItemsCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform flex-shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-normal">
                Mahaweli
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 -mt-0.5 tracking-normal">
                Sales Outlet
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 -mt-0.5 tracking-normal">
                Kurunegala
              </p>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/products"
                  ? "text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/about"
                  ? "text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "text-green-500"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Contact
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-green-500 transition-colors flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>
          {/* Desktop Cart & User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate("/profile")}
                className="p-2 text-gray-600 hover:text-green-500 transition-colors"
                title="My Profile"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-600 hover:text-green-500 transition-colors"
                title="Login"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-green-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden lg:inline">Shop Now</span>
            </Link>
          </div>
          {/* Mobile Cart & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={() => navigate("/profile")}
                className="p-2 text-gray-600 hover:text-green-500 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-600 hover:text-green-500 transition-colors"
                title="Login"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-green-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-base font-medium transition-colors py-2 ${
                  location.pathname === "/" ? "text-green-500" : "text-gray-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-base font-medium transition-colors py-2 ${
                  location.pathname === "/products"
                    ? "text-green-500"
                    : "text-gray-600"
                }`}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`text-base font-medium transition-colors py-2 ${
                  location.pathname === "/about"
                    ? "text-green-500"
                    : "text-gray-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-base font-medium transition-colors py-2 ${
                  location.pathname === "/contact"
                    ? "text-green-500"
                    : "text-gray-600"
                }`}
              >
                Contact
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="text-base font-medium text-gray-600 flex items-center gap-2 py-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-medium text-base transition-all mt-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomerNav;
