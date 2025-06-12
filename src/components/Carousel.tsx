import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface CarouselProps {
  slides: {
    year: string;
    title: string;
    description: string;
  }[];
}

export function Carousel({ slides }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedIndex === index ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-secondary/20">
                <span className="text-secondary text-xl font-bold">{slide.year}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4">{slide.title}</h3>
                <p className="text-gray-300 text-lg">{slide.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/20 hover:bg-secondary/40 rounded-full p-2 transition-colors duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/20 hover:bg-secondary/40 rounded-full p-2 transition-colors duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              selectedIndex === index ? 'bg-secondary' : 'bg-secondary/20'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}