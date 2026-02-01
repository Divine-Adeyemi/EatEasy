import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

// Check this path
import carouselImage from '../../assets/onboarding-carousel.webp'; 

const DEFAULT_SLIDES = [
  {
    id: 1,
    image: carouselImage, 
    title: "Full contactless experience",
    desc: "From ordering to paying, that's all contactless."
  },
  {
    id: 2,
    image: carouselImage,
    title: "Fast Delivery",
    desc: "Fresh food delivered to your doorstep."
  },
  {
    id: 3,
    image: carouselImage,
    title: "Live Tracking",
    desc: "Real-time GPS tracking of your delivery."
  }
];

export default function Slider({ slides = DEFAULT_SLIDES }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between relative overflow-hidden
                    
                    /* BASE (Mobile): Transparent */
                    bg-transparent
                    
                    /* DESKTOP (md): Card Style */
                    md:rounded-3xl
                    md:bg-gradient-to-b md:from-[#FCFCFC] md:to-[#F7F7F7]
                    md:dark:bg-none md:dark:bg-[var(--neutral-700)]
                    md:shadow-2xl md:dark:shadow-none">
      
      {/* Border (Desktop Only) */}
      <div className="hidden md:block absolute inset-0 border border-gray-100 dark:border-white/5 rounded-3xl pointer-events-none z-20"></div>

      {/* SWIPER AREA */}
      <Swiper
        modules={[Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{ 
          el: '.custom-swiper-scrollbar',
          draggable: true,
          dragClass: 'swiper-scrollbar-drag',
          snapOnRelease: true
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        /* PADDING LOGIC:
           Mobile (!pb-8): No logo at bottom, just need a bit of space.
           Desktop (!pb-28): Needs big space for the Logo.
        */
        className="w-full h-full !pb-8 md:!pb-28 relative z-10"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="flex flex-col h-full relative">
            
            {/* A. IMAGE SECTION 
                Mobile: Added 'mb-12' to create a GAP for the scrollbar to sit in.
                Desktop: 'pb-8' is enough.
            */}
            <div className="flex-1 w-full flex items-center justify-center min-h-0 md:mb-0 md:pt-9">
              <div className="relative flex justify-center items-center w-full h-full">
                
                 {/* Image */}
                 <img 
                   src={slide.image} 
                   alt={slide.title} 
                   className="relative z-10 h-full max-h-[280px] w-auto object-contain drop-shadow-xl" 
                 />
              </div>
            </div>

            {/* B. TEXT SECTION 
                Fixed height to prevent jumping.
            */}
            <div className="shrink-1 h-28 w-full max-w-sm mx-auto text-center px-4 flex flex-col justify-end">
              <h2 className="text-xl md:2xl font-bold  mb-2 whitespace-nowrap leading-tight">
                {slide.title}
              </h2>
              <p className="text-sm leading-relaxed">
                {slide.desc}
              </p>
            </div>

          </SwiperSlide>
        ))}

        {/* 3. SCROLLBAR POSITIONING 
          
        */}

        <div className={`
            absolute left-0 right-0 mx-auto flex justify-center z-50 bottom-30
            md:bottom-50
        `}>
          <div className="custom-swiper-scrollbar w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative cursor-pointer">
             {/* Handle injected here */}
          </div>
        </div>

      </Swiper>

     
      <h1 className="hidden md:block absolute bottom-10 left-0 right-0 text-center font-bold text-lg z-30 select-none">
          Eat <span className="text-[var(--tertiary-700)]">Easy</span>
      </h1>

      <style>{`
        .swiper-scrollbar-drag {
          background-color: var(--tertiary-700) !important;
          border-radius: 999px;
          height: 100%;
        }
        .swiper-slide {
          display: flex;
          height: 100%;
        }
      `}</style>
    </div>
  );
}