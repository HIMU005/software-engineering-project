import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import SwipeIt from "./SwipeIt";

const Hero = () => {
  const axiosCommon = useAxiosCommon();

  const { data: heros = [] } = useQuery({
    queryKey: ["heros"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/hero");
      return data;
    },
  });

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {heros.map((hero) => (
        <SwiperSlide key={hero._id}>
          <SwipeIt hero={hero} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
