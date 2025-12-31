import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Leaf, Heart, Truck, Award } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function Homepage() {
  const { data: products = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const featuredProducts = (products as Product[]).filter(
    (p) => p.featured && p.in_stock
  );

  const categories = [
    {
      name: "Dairy",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Oils & Ghee",
      image:
        "https://images.unsplash.com/photo-1608181078253-f3b7875030ab?w=500&h=500&fit=crop",
      color: "from-amber-400 to-amber-600",
    },
    {
      name: "Treacle & Jaggery",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500&h=500&fit=crop",
      color: "from-orange-400 to-orange-600",
    },
    {
      name: "Spices",
      image:
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&h=500&fit=crop",
      color: "from-red-400 to-red-600",
    },
    {
      name: "Herbal Products",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
      color: "from-green-400 to-green-600",
    },
    {
      name: "Traditional Sweets",
      image:
        "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&h=500&fit=crop",
      color: "from-pink-400 to-pink-600",
    },
    {
      name: "Juices",
      image:
        "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500&h=500&fit=crop",
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop",
      color: "from-teal-400 to-teal-600",
    },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Pure traditional products",
    },
    { icon: Heart, title: "Quality", description: "Certified authentic" },
    { icon: Truck, title: "Fresh", description: "Direct delivery" },
    { icon: Award, title: "Certified", description: "Government approved" },
  ];

  const partners = [
    { name: "NLDB", fullName: "National Livestock Development Board" },
    { name: "Mahaweli", fullName: "Mahaweli Authority" },
    { name: "SLSI", fullName: "Standards Institution" },
    { name: "Ayurveda", fullName: "Department of Ayurveda" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                Authentic Sri Lankan Products
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Pure & Natural <br />
                <span className="text-green-500">Traditional Goodness</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                From fresh dairy and spices to traditional sweets. Discover the
                finest Sri Lankan heritage products delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to={createPageUrl("Products")}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  to={createPageUrl("About")}
                  className="w-full sm:w-auto border-2 border-gray-200 hover:border-green-500 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop"
                alt="Traditional Sri Lankan spices"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Horizontally Scrollable */}
      {featuredProducts.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Featured Products
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  {featuredProducts.length} handpicked favorites from our
                  collection
                </p>
              </div>
              <Link
                to={`${createPageUrl("Products")}?category=Featured`}
                className="text-green-500 hover:text-green-600 font-semibold flex items-center gap-1 sm:gap-2 group text-xs sm:text-sm md:text-base"
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative -mx-4 sm:-mx-6">
              <div className="overflow-x-auto px-4 sm:px-6 pb-4 scrollbar-hide">
                <div
                  className="flex gap-3 sm:gap-4 md:gap-6"
                  style={{ width: "max-content" }}
                >
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Gradient Overlays for scroll hint */}
              <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
      )}

      {/* Trusted Partners - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
              Trusted By
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Our Certified Partners
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-24 sm:h-28 md:h-32 flex items-center justify-center hover:bg-green-50 transition-colors border border-gray-200 group-hover:border-green-200">
                  <div className="text-center">
                    <div className="text-base sm:text-xl md:text-2xl font-bold text-green-600 mb-0.5 sm:mb-1">
                      {partner.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 leading-tight">
                      {partner.fullName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Mobile Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center space-y-2 sm:space-y-3 md:space-y-4 group bg-gray-50 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-100 rounded-xl sm:rounded-2xl group-hover:bg-green-500 transition-colors">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-tight">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Explore authentic Sri Lankan products
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`${createPageUrl("Products")}?category=${category.name}`}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                ></div>
                <div className="absolute inset-0 flex items-end p-3 sm:p-4 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
            Experience Authentic Sri Lankan Quality
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
            Join thousands enjoying pure, traditional products from Mahaweli
            Authority
          </p>
          <Link
            to={createPageUrl("Products")}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Natural</h3>
              <p className="text-sm text-gray-600">Pure traditional products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-sm text-gray-600">Certified authentic</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fresh</h3>
              <p className="text-sm text-gray-600">Direct delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certified</h3>
              <p className="text-sm text-gray-600">Government approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View all
            </Link>
          </div>
          {featuredProducts.length === 0 ? (
            <p className="text-gray-600">No featured products yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 8).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to experience authentic Sri Lankan products?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Browse our collection and order today!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
