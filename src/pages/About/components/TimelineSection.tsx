import { milestones } from "../constants";

export default function TimelineSection() {
  return (
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
  );
}
