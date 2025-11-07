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
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            Voices
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Trusted by founders, teams & collaborators
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Notes from the partners and teammates who’ve shipped meaningful outcomes alongside me.
          </p>
        </div>

        <ClientOnly>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            speed={900}
            centeredSlides
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            modules={[Autoplay]}
            className="mt-14 w-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="py-6">
                <div className="mx-auto flex h-[520px] max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                      <Image
                        src={testimonial.image || placeholderImage}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{testimonial.designation}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    <p
                      ref={(el: HTMLParagraphElement | null) => {
                        refs.current[index] = el;
                      }}
                      className="line-clamp-6 text-sm leading-relaxed text-slate-600"
                    >
                      {testimonial.review}
                    </p>
                  </div>

                  <div className="mt-auto">
                    {testimonial.companyLogo && (
                      <div className="mt-6 flex items-center justify-between">
                        <Image
                          src={testimonial.companyLogo}
                          alt="Company Logo"
                          width={120}
                          height={32}
                          className="object-contain opacity-80"
                        />
                        {overflowIndexes.includes(index) && (
                          <button
                            onClick={() => setSelectedReview(testimonial)}
                            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                          >
                            Read full
                          </button>
                        )}
                      </div>
                    )}
                    {!testimonial.companyLogo && overflowIndexes.includes(index) && (
                      <button
                        onClick={() => setSelectedReview(testimonial)}
                        className="mt-6 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        Read full
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientOnly>

        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl">
              <button
                onClick={() => setSelectedReview(null)}
                className="mb-4 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-400 hover:text-slate-900"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-4 text-slate-700">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  <Image
                    src={selectedReview.image || placeholderImage}
                    alt={selectedReview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedReview.name}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{selectedReview.designation}</p>
                <p className="text-sm text-slate-600">{selectedReview.role}</p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{selectedReview.review}</p>
                {selectedReview.companyLogo && (
                  <Image
                    src={selectedReview.companyLogo}
                    alt="Company Logo"
                    width={160}
                    height={40}
                    className="mt-4 object-contain opacity-80"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSlider;
