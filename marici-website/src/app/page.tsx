import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";

import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { Testimonial } from "@/models/Testimonial";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  await connectToDatabase();

  // Fetch data
  const services = await Service.find().sort({ order: 1, createdAt: -1 }).limit(6).lean();
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).limit(3).lean();

  // Convert ObjectIds to strings for serialization
  const serializedServices = services.map(s => ({
    ...s,
    _id: s._id.toString()
  }));

  const serializedTestimonials = testimonials.map(t => ({
    ...t,
    _id: t._id.toString()
  }));

  return (
    <>
      <Hero />
      <ServicesOverview initialServices={serializedServices} />
      <Stats />
      <Testimonials initialTestimonials={serializedTestimonials} />
    </>
  );
}
