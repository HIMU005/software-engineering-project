import { Helmet } from "react-helmet-async";
import Hero from "../../components/Home/Hero";
import Testimonial from "../../components/Home/Testimonial";
import Featured from "./Featured";
import HowItWork from "./HowItWork";
import TopEarner from "./TopEarner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Work Provider || Home </title>
      </Helmet>
      <Hero />
      <Featured />
      <HowItWork />
      <TopEarner />
      <Testimonial />
    </div>
  );
};

export default Home;
