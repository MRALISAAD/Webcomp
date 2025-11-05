export declare const prefersReduced: boolean;
export declare const sectionVariants: {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number; transition: { duration: number; ease: string } };
};
export declare const staggerChildren: {
  hidden: { opacity: number; y: number };
  visible: (index?: number) => {
    opacity: number;
    y: number;
    transition: { duration: number; ease: string; delay: number };
  };
};


