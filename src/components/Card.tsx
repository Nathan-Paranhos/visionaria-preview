import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Card({ icon: Icon, title, description }: CardProps) {
  return (
    <motion.div
      className="
        p-8 
        rounded-xl 
        border-2
        border-gray-100 
        hover:border-secondary 
        transition-all 
        duration-500 
        bg-white
        cursor-pointer
        group
        h-full
        flex
        flex-col
        relative
        overflow-hidden
      "
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        className="mb-6 relative"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <Icon className="
          w-16 
          h-16 
          text-secondary 
          group-hover:text-secondary-light 
          transition-colors 
          duration-500
          filter
          drop-shadow-md
        " />
        <div className="
          absolute 
          inset-0 
          bg-secondary/10 
          rounded-full 
          scale-150 
          opacity-0 
          group-hover:opacity-100 
          transition-all
          duration-500
          animate-pulse-soft
        " />
      </motion.div>
      <h3 className="
        text-2xl 
        font-semibold 
        mb-3
        group-hover:text-secondary 
        transition-colors 
        duration-500
      ">
        {title}
      </h3>
      <p className="
        text-gray-600 
        group-hover:text-gray-800 
        transition-colors 
        duration-500
        text-lg
      ">
        {description}
      </p>
    </motion.div>
  );
}