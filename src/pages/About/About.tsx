import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Leaf,
  Heart,
  Users,
  Award,
  Shield,
  Target,
  Truck,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "We source only pure, natural products without any artificial additives or preservatives.",
  },
  {
    icon: Shield,
    title: "Certified Quality",
    description:
      "All our products meet strict government standards and are certified by relevant authorities.",
  },
  {
    icon: Heart,
    title: "Traditional Methods",
    description:
      "We preserve authentic Sri Lankan recipes and time-honored production methods.",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "We support local farmers and producers, ensuring fair prices and sustainable practices.",
  },
];

const partners = [
  {
    name: "NLDB",
    fullName: "National Livestock Development Board",
    description:
      "Premium dairy products including fresh milk, curd, and traditional dairy items.",
  },
  {
    name: "Mahaweli Authority",
    fullName: "Mahaweli Authority of Sri Lanka",
    description:
      "Fresh produce and agricultural products from government-managed farms.",
  },
  {
    name: "Department of Ayurveda",
    fullName: "Government Ayurveda Department",
    description:
      "Authentic herbal products and traditional medicinal preparations.",
  },
  {
    name: "Local Artisans",
    fullName: "Certified Traditional Producers",
    description:
      "Treacle, jaggery, traditional sweets, and handcrafted food products.",
  },
];

const milestones = [
  { year: "2015", event: "Established in Kurunegala" },
  { year: "2018", event: "Expanded product range" },
  { year: "2022", event: "Reached 50+ quality products" },
  { year: "2025", event: "Serving 5,000+ families" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="text-green-500">Mahaweli Sales Outlet</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Bringing the finest Sri Lankan heritage products from Mahaweli
              Authority and certified government farms directly to families in
              Kurunegala.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-green-600">
                <Target className="w-6 h-6" />
                <span className="font-semibold uppercase text-sm tracking-wider">
                  Our Mission
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Preserving Sri Lankan Heritage Through Quality Products
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                As an official Mahaweli Sales Outlet in Kurunegala, we believe
                in the power of authentic, traditional Sri Lankan products. Our
                mission is to connect families with the pure, natural goodness
                of products sourced directly from Mahaweli Authority and
                certified government farms.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We work exclusively with NLDB, Mahaweli Authority, and certified
                traditional artisans to ensure every product meets the highest
                standards of quality, authenticity, and taste.
              </p>
              <Link
                to={createPageUrl("Products")}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                Explore Our Products
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop"
                alt="Sri Lankan farm"
                className="relative rounded-3xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                  <value.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-gray-600 text-lg">
              Working with Sri Lanka's finest certified producers
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-600 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {partner.fullName}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-green-500 to-green-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-green-100 text-lg">
              Growing together with Kurunegala community
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="text-4xl font-bold text-white mb-3">
                    {milestone.year}
                  </div>
                  <p className="text-green-50">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center">
            <Award className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Quality Commitment
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Every product is carefully selected, tested, and verified to meet
              strict government standards. We guarantee authenticity, purity,
              and the highest quality in every item we deliver.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Government Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Quality Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of families in Kurunegala enjoying authentic Sri
            Lankan products
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={createPageUrl("Products")}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
            >
              <Truck className="w-5 h-5" />
              Shop Now
            </Link>
            <Link
              to={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-green-500 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
