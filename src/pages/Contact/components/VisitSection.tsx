import { MapPin, Clock } from "lucide-react";

export default function VisitSection() {
  return (
    <div className="mt-12 sm:mt-16">
      <div className="border-0 shadow-sm overflow-hidden rounded-2xl bg-white">
        <div className="grid md:grid-cols-2">
          <div className="h-64 sm:h-80 md:h-full bg-gray-100 relative">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
              alt="Map location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Visit Our Store
                </h3>
                <p className="text-sm sm:text-base text-green-100">
                  Mahaweli Sales Outlet, Kurunegala
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Visit Us in Person
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Location
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Mahaweli Sales Outlet
                    <br />
                    Kurunegala, Sri Lanka
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Opening Hours
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Mon - Sat: 8:00 AM - 8:00 PM
                    <br />
                    Sunday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
