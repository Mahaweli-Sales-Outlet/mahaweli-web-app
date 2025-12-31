import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CATEGORIES } from "../constants";

export default function CategoriesSection() {
  return (
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
          {CATEGORIES.map((category) => (
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
              />
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
  );
}
