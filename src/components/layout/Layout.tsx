import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { authApi } from "@/api/auth";
import AdminNav from "./AdminNav";
import CustomerNav from "./CustomerNav";
import Footer from "./Footer";

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

  // Update user on mount and when accessToken changes
  useEffect(() => {
    const fetchUser = () => {
      authApi
        .getCurrentUser()
        .then((response: any) => {
          setUser(response.data.user);
        })
        .catch(() => {
          setUser(null);
        });
    };
    fetchUser();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") fetchUser();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
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
