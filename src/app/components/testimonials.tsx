"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "Founder - xyz.com",
    review:
      "Job well done! I am really impressed. Noman is very good at what he does. I would recommend him and will rehire in the future for frontend development.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    role: "Project Manager - abc.com",
    review:
      "Noman is a great guy, highly recommended for any COMPLEX front-end development job! His skills are top-notch and he will be an amazing addition to any team.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "CTO - xyz solutions",
    review:
      "Noman is highly skilled and delivered the project on time with exceptional quality. He has a deep understanding of frontend and backend technologies, and I am really happy with his work.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Freelancer",
    review:
      "Working with Noman was extremely easy and pleasant. He truly cares about the success of the project and delivers outstanding results. His expertise in MERN stack development is exceptional!",
    rating: 5,
  },
];

const TestimonialSlider: FC = () => {
  // Filter only 5-star reviews
  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.rating === 5
  );

  return (
    <div className="px-6 py-20 bg-gray-50">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
          Testimonials
        </span>
      </div>
      <p className="text-center text-gray-600 mb-10">
        Nice things people have said about me:
      </p>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={1000}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        className="max-w-5xl mx-auto"
      >
        {filteredTestimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="py-[20px]">
            {({ isActive }) => (
              <div
                className={`p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center h-[400px] transition-all duration-300 ${
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
                }`}
              >
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-2xl text-gray-500">👤</span>
                </div>
                {/* Review Text */}
                <p className="text-gray-600 italic mb-4 flex-1">
                  &quot;{testimonial.review}&quot;
                </p>
                {/* Name and Role */}
                <div className="mt-auto">
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  {/* Rating */}
                  <div className="flex items-center justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
