import { BENEFITS } from "../constants";

export default function BenefitsSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => (
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
  );
}
