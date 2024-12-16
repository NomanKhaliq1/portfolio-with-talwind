"use client";

import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  companyLogo: string;
  image: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Ahsan Raza",
    role: "awesometechinc.com",
    companyLogo: "/reveiws/company-logos/awesometechinc.webp",
    image: "/reveiws/persons/ahsan-raza.jpeg",
    review:
      "I want to express my admiration for Noman Khaliq, an exceptional developer who has recently worked on React projects that truly inspired me. I firmly believe that Noman has the potential to make Pakistan proud in the future. His dedication and consistent efforts are commendable, and he has proven himself to be a highly capable developer. Ignoring such a talented individual would be equivalent to hindering the growth of someone with immense potential. Noman is not only an outstanding developer but also a great human being, and there is no doubt about his remarkable abilities. I am confident that he is destined to become one of the most successful individuals in the times to come.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    role: "Project Manager - abc.com",
    companyLogo: "",
    image: "",
    review:
      "Noman is a great guy, highly recommended for any COMPLEX front-end development job! His skills are top-notch and he will be an amazing addition to any team.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "CTO - xyz solutions",
    companyLogo: "",
    image: "",
    review:
      "Noman is highly skilled and delivered the project on time with exceptional quality. He has a deep understanding of frontend and backend technologies, and I am really happy with his work.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Freelancer",
    companyLogo: "",
    image: "",
    review:
      "Working with Noman was extremely easy and pleasant. He truly cares about the success of the project and delivers outstanding results. His expertise in MERN stack development is exceptional!",
    rating: 5,
  },
];

const TestimonialSlider: FC = () => {
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const placeholderImage = "/reveiws/placeholder.png";

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
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center h-[400px]">
              <img
                src={testimonial.image || placeholderImage}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4 line-clamp-6">
                &quot;{testimonial.review}&quot;
              </p>
              {testimonial.review.length > 200 && (
                <button
                  onClick={() => setSelectedReview(testimonial)}
                  className="text-blue-600 hover:underline text-sm mb-4"
                >
                  Read More
                </button>
              )}
              <div className="mt-auto">
                <div className="font-bold text-gray-800">{testimonial.name}</div>
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt="Company Logo"
                    className="w-12 h-12 object-contain mx-auto mt-2"
                  />
                )}
                <div className="flex items-center justify-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
            <img
              src={selectedReview.image || placeholderImage}
              alt={selectedReview.name}
              className="w-20 h-20 rounded-full mb-4 mx-auto object-cover"
            />
            <h3 className="text-xl font-bold mb-2">{selectedReview.name}</h3>
            <div className="text-gray-500 text-sm mb-4">{selectedReview.role}</div>
            <p className="text-gray-600 mb-6">&quot;{selectedReview.review}&quot;</p>
            <div className="flex items-center justify-center mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            {selectedReview.companyLogo && (
              <img
                src={selectedReview.companyLogo}
                alt="Company Logo"
                className="w-16 h-16 object-contain mx-auto mb-4"
              />
            )}
            <button
              onClick={() => setSelectedReview(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;
