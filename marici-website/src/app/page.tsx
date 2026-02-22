import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";

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

  // Convert ObjectIds to strings for serialization
  const serializedServices = (services || []).map((s: any) => ({
    ...s,
    _id: s._id?.toString() || ""
  }));

  const serializedTestimonials = (testimonials || []).map((t: any) => ({
    ...t,
    _id: t._id?.toString() || ""
  }));

  const serializedSlides = (heroSlides || []).map((s: any) => ({
    ...s,
    _id: s._id?.toString() || ""
  }));

  return (
    <>
      <Hero initialSlides={serializedSlides} />
      <ServicesOverview initialServices={serializedServices} />
      <Stats />
      <Testimonials initialTestimonials={serializedTestimonials} />
    </>
  );
}
