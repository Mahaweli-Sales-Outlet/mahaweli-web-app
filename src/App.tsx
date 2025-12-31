import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

// Pages
import HomePage from "@/pages/Home/HomePage";
import Products from "@/pages/Products/ProductPage/Products";
import ProductDetails from "@/pages/Products/ProductDetails/ProductDetails";
import Cart from "@/pages/Order/Cart/Cart";
import Checkout from "@/pages/Order/Checkout/Checkout";
import OrderConfirmation from "@/pages/Order/OrderConfirmation/OrderConfirmation";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import UserProfile from "@/pages/Profile/UserProfile";

// Admin Pages
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminProducts from "@/pages/Admin/AdminProducts";
import AdminProductForm from "@/pages/Admin/AdminProductForm";
import AdminOrders from "@/pages/Admin/AdminOrders";
import AdminAnalytics from "@/pages/Admin/AdminAnalytics";

// Auth Initializer Component (simplified - store now handles initialization)
function AuthInitializer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        duration={5000}
        closeButton
        expand={true}
      />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <Layout isAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AppRoutes />
      </AuthInitializer>
    </Provider>
  );
}

export default App;
