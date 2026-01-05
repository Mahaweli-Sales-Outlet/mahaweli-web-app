import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectUser,
  selectAuthError,
  clearError,
  logoutThunk,
} from "@/redux/slices/authSlice";
import AdminNav from "./AdminNav";
import CustomerNav from "./CustomerNav";
import Footer from "./Footer";

interface LayoutProps {
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduxUser = useAppSelector(selectUser);
  const authError = useAppSelector(selectAuthError);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Clear auth errors on route change
  useEffect(() => {
    if (authError) {
      dispatch(clearError());
    }
  }, [location.pathname, dispatch, authError]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  // Transform Redux user to local user format
  const user = reduxUser
    ? {
        id: reduxUser.id,
        name: reduxUser.name,
        email: reduxUser.email,
        role: reduxUser.role,
      }
    : null;

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav
          user={user}
          onLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  // Customer Layout
  return (
    <div className="min-h-screen bg-white">
      <CustomerNav
        user={user}
        cartItemsCount={cartItemsCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
