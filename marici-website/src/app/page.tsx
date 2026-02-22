import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { Testimonial } from "@/models/Testimonial";
import { HeroSlide } from "@/models/HeroSlide";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  await connectToDatabase();

  // Fetch data
  let services: any[] = [];
  let testimonials: any[] = [];
  let heroSlides: any[] = [];

  try {
    services = await Service.find().sort({ order: 1, createdAt: -1 }).limit(6).lean();
    testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).limit(3).lean();
    heroSlides = await HeroSlide.find({ isActive: true }).sort({ order: 1 }).lean();
  } catch (error) {
    console.error("Home page data fetch failed:", error);
  }

  // Convert to plain objects for serialization
  const serializedServices = JSON.parse(JSON.stringify(services || []));
  const serializedTestimonials = JSON.parse(JSON.stringify(testimonials || []));
  const serializedSlides = JSON.parse(JSON.stringify(heroSlides || []));

  return (
    <>
      <Hero initialSlides={serializedSlides} />
      <ServicesOverview initialServices={serializedServices} />
      <Stats />
      <Testimonials initialTestimonials={serializedTestimonials} />
      <CallToAction />
    </>
  );
}
