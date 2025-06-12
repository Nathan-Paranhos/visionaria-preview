import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function Button({ children, onClick, className = '', href }: ButtonProps) {
  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative
        overflow-hidden
        bg-secondary 
        hover:bg-secondary-light 
        text-white 
        font-semibold 
        py-4 
        px-8 
        rounded-xl
        transition-all 
        duration-500 
        shadow-lg
        hover:shadow-2xl
        active:shadow-md
        focus:outline-none 
        focus:ring-2 
        focus:ring-secondary 
        focus:ring-opacity-50
        before:content-['']
        before:absolute
        before:inset-0
        before:bg-white/20
        before:translate-x-[-100%]
        hover:before:translate-x-[100%]
        before:transition-transform
        before:duration-700
        text-lg
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}