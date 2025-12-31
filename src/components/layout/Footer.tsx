import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-100 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </span>
            <div>
              <span className="font-bold text-gray-900 block leading-tight tracking-normal">
                Mahaweli Sales Outlet
              </span>
              <span className="text-xs text-gray-500">Kurunegala</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Your trusted source for authentic Sri Lankan products from Mahaweli
            Authority and certified government farms.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <a
              href="/"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Home
            </a>
            <a
              href="/products"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Products
            </a>
            <a
              href="/about"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Contact
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            <a
              href="/products?category=Dairy"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Dairy Products
            </a>
            <a
              href="/products?category=Spices"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Spices
            </a>
            <a
              href="/products?category=Herbal Products"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Herbal Products
            </a>
            <a
              href="/products?category=Traditional Sweets"
              className="block text-sm text-gray-600 hover:text-green-500"
            >
              Traditional Sweets
            </a>
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
);

export default Footer;
