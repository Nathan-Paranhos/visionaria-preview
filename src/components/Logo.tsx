import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  alt?: string;
  src?: string;
}

export function Logo({ className = '', alt, src = '/logo.png' }: LogoProps) {
  return (
    <motion.img 
      src={src} 
      alt={alt || "Visionaria Logo"} 
      className={`h-full w-auto object-contain ${className}`} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    />
  );
}