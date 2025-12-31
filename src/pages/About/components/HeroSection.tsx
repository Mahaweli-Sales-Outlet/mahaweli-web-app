import { Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-green-500">Mahaweli Sales Outlet</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bringing the finest Sri Lankan heritage products from Mahaweli
            Authority and certified government farms directly to families in
            Kurunegala.
          </p>
        </div>
      </div>
    </section>
  );
}
