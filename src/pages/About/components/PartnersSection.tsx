import { CheckCircle } from "lucide-react";
import { partners } from "../constants";

export default function PartnersSection() {
  return (
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
  );
}
