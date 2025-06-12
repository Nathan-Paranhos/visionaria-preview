import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: ReactNode;
  bg?: string;
}

export function SectionWrapper({ id, title, children, bg = 'bg-primary' }: SectionWrapperProps) {
  return (
    <section id={id} className={`${bg} text-white py-24 relative`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {title && <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
