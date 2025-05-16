import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import TestimonialCard from "./TestimonialCard";
const Testimonial = () => {
    const axiosCommon = useAxiosCommon();
    const { data: tests = [] } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/testimonial');
            return data;
        }
    })
    return (
        <div>
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
                Testimonial <span className="text-blue-500"></span>
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
                    {
                        tests.map(test => <SwiperSlide key={test._id} > <TestimonialCard test={test} /> </SwiperSlide>)
                    }
                </Swiper>

            </h1>

        </div>
    );
};

export default Testimonial;