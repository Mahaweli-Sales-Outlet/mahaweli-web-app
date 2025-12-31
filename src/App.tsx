import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

// Pages
import HomePage from "@/pages/HomePage";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Order/Cart";
import Checkout from "@/pages/Order/Checkout";
import OrderConfirmation from "@/pages/Order/OrderConfirmation";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register";
import UserProfile from "@/pages/UserProfile";

// Admin Pages
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminProducts from "@/pages/Admin/AdminProducts";
import AdminProductForm from "@/pages/Admin/AdminProductForm";
import AdminOrders from "@/pages/Admin/AdminOrders";
import AdminAnalytics from "@/pages/Admin/AdminAnalytics";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
