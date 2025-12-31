import {
  HeroSection,
  FeaturedProductsSection,
  PartnersSection,
  BenefitsSection,
  CategoriesSection,
  CTASection,
} from "./components";
import { useFeaturedProducts } from "./hooks";

export default function HomePage() {
  const { featuredProducts } = useFeaturedProducts();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProductsSection products={featuredProducts} />
      <PartnersSection />
      <BenefitsSection />
      <CategoriesSection />
      <CTASection />
    </div>
  );
}
