"use client";

import { FC, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import ClientOnly from "./ClientOnly";
import { testimonials, Testimonial } from "@/app/data/testimonials";

const TestimonialSlider: FC = () => {
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const placeholderImage = "/reveiws/placeholder.png";
  const refs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [overflowIndexes, setOverflowIndexes] = useState<number[]>([]);

  useEffect(() => {
  const timeout = setTimeout(() => {
    const indexes: number[] = [];
    refs.current.forEach((el, i) => {
      if (el && el.scrollHeight > el.offsetHeight + 10) {
        indexes.push(i);
      }
    });
    setOverflowIndexes(indexes);
  }, 300); // delay to wait for images/fonts

  return () => clearTimeout(timeout);
}, []);

  return (
    <section id="testimonials" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            Testimonials
          </span>
          <p className="text-lg text-gray-600 mt-2">
            What people are saying about my work
          </p>
        </div>
        
      <ClientOnly>
        <Swiper spaceBetween={30} slidesPerView={1} loop={true} speed={1000} centeredSlides autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false 
          }} breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }} modules={[Autoplay]} className="w-full">
          {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="py-6">
            <div
              className="p-6 bg-white rounded-2xl shadow-lg flex flex-col w-full max-w-md mx-auto h-[560px] text-center">
              {/* Banner and Company Logo */}
              <div className="relative w-full">
                <div className="bg-indigo-100 w-full h-36 rounded-t-xl flex items-center justify-center relative">
                  {testimonial.companyLogo && (
                  <Image src={testimonial.companyLogo} alt="Company Logo" width={150} height={40}
                    className="object-contain absolute top-5 left-1/2 -translate-x-1/2 z-10" />
                  )}
                </div>

                {/* Person Image */}
                <div className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 z-20">
                  <Image src={testimonial.image || placeholderImage} alt={testimonial.name} width={120} height={120}
                    className="rounded-full object-cover shadow border-4 border-white" />
                </div>
              </div>

              {/* Body */}
              <div className="mt-[70px] flex flex-col justify-between flex-1">
                <div>
                  <div className="font-bold text-gray-800 mt-2">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.designation}</div>
                  <div className="flex items-center justify-center mt-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p ref={(el: HTMLParagraphElement | null)=> {
                    refs.current[index] = el;
                    }}
                    className="text-gray-700 font-medium text-base leading-relaxed line-clamp-6"
                    >
                    {testimonial.review}
                  </p>
                </div>

                {/* Read More Button */}
                {overflowIndexes.includes(index) && (
                <button onClick={()=> setSelectedReview(testimonial)}
                  className="text-sm mt-2 text-indigo-600 font-semibold hover:underline transition duration-150"
                  >
                  Read More
                </button>
                )}
              </div>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
      </ClientOnly>

        {/* Modal */}
        {selectedReview && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
              <Image
                src={selectedReview.image || placeholderImage}
                alt={selectedReview.name}
                width={80}
                height={80}
                className="rounded-full mb-4 mx-auto object-cover"
              />
              <h3 className="text-xl font-bold mb-1">{selectedReview.name}</h3>
              <p className="text-sm text-gray-500">{selectedReview.designation}</p>
              <p className="text-sm text-gray-500 mb-4">{selectedReview.role}</p>
              <p className="text-gray-700 mb-6">{selectedReview.review}</p>
              <div className="flex items-center justify-center mb-4">
                {[...Array(selectedReview.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              {selectedReview.companyLogo && (
                <Image
                  src={selectedReview.companyLogo}
                  alt="Company Logo"
                  width={160}
                  height={40}
                  className="object-contain mx-auto mb-4"
                />
              )}
              <button
                onClick={() => setSelectedReview(null)}
                className="mt-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSlider;