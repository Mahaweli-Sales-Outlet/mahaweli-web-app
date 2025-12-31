import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Leaf,
  LayoutDashboard,
  Menu,
  X,
  ShoppingCart,
  Package,
  TrendingUp,
  User as UserIcon,
} from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { authApi } from "@/api/auth";

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
}

interface LayoutProps {
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    authApi
      .getCurrentUser()
      .then((response: any) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                    onClick={handleLogout}
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
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
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
                      onClick={handleLogout}
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
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  // Customer Layout
  return (
    <div className="min-h-screen bg-white">
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
                    location.pathname === "/"
                      ? "text-green-500"
                      : "text-gray-600"
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

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-500" />
                <div>
                  <span className="font-bold text-gray-900 block leading-tight tracking-normal">
                    Mahaweli Sales Outlet
                  </span>
                  <span className="text-xs text-gray-500">Kurunegala</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Your trusted source for authentic Sri Lankan products from
                Mahaweli Authority and certified government farms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <Link
                  to="/products?category=Dairy"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Dairy Products
                </Link>
                <Link
                  to="/products?category=Spices"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Spices
                </Link>
                <Link
                  to="/products?category=Herbal Products"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Herbal Products
                </Link>
                <Link
                  to="/products?category=Traditional Sweets"
                  className="block text-sm text-gray-600 hover:text-green-500"
                >
                  Traditional Sweets
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-sm text-gray-600">
                Email: kurunegala@mahaweli.lk
                <br />
                Phone: +94 37 222 2345
                <br />
                Address: Mahaweli Sales Outlet
                <br />
                Kurunegala, Sri Lanka
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Mahaweli Sales Outlet Kurunegala. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
