import { PARTNERS } from "../constants";

export default function PartnersSection() {
  return (
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
          {PARTNERS.map((partner, index) => (
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
  );
}
