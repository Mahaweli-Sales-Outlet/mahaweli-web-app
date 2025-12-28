import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Leaf,
  LayoutDashboard,
  Menu,
  X,
  ShoppingCart,
  Package,
  TrendingUp,
  Home,
  Info,
  Phone,
} from "lucide-react";
import { useAppSelector } from "../redux/hooks";

interface LayoutProps {
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
                <Link
                  to="/"
                  className="ml-4 px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Store
                </Link>
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
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600"
                >
                  <Home className="w-4 h-4" />
                  Back to Store
                </Link>
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
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden sm:inline">
                Mahaweli Outlet
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === "/"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === "/products"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === "/about"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === "/contact"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="ml-4 relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === "/"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                to="/products"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === "/products"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Package className="w-4 h-4" />
                Products
              </Link>
              <Link
                to="/about"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === "/about"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                to="/contact"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === "/contact"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">Mahaweli Outlet</span>
              </div>
              <p className="text-gray-400 text-sm">
                Authentic Sri Lankan traditional products delivered fresh to
                your doorstep.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Dairy Products</li>
                <li>Oils & Ghee</li>
                <li>Spices</li>
                <li>Herbal Products</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +94 XX XXX XXXX</li>
                <li>Email: info@mahaweli.lk</li>
                <li>Location: Sri Lanka</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Mahaweli Sales Outlet. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
