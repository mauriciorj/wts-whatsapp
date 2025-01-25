import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";

const Home = async () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;
