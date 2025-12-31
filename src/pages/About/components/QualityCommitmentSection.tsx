import { Award, CheckCircle } from "lucide-react";
import { qualityBadges } from "../constants";

export default function QualityCommitmentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center">
          <Award className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Our Quality Commitment
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Every product is carefully selected, tested, and verified to meet
            strict government standards. We guarantee authenticity, purity, and
            the highest quality in every item we deliver.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {qualityBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
