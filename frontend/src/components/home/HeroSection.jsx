import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import OptimizedImage from "../OptimizedImage.jsx";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";
const HERO_MEDIA = {
  base: "/images/hero.jpg",
  webp: "/images/hero.webp",
  avif: "/images/hero.webp",
  retina: "/images/hero.jpg",
  width: 864,
  height: 1152,
  sizes: "(min-width: 1280px) 520px, (min-width: 768px) 55vw, 90vw",
};

const HeroSection = memo(function HeroSection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="hero"
      aria-label={data.title}
      role="region"
      className="relative overflow-hidden bg-marhaban-beige text-marhaban-blue pt-28 pb-20 font-title dark:bg-marhaban-blue dark:text-marhaban-gold transition-colors duration-300 md:pt-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 md:items-center px-6 md:px-8">
        <motion.div
          className={clsx("space-y-6 font-sans", isRTL ? "md:order-2 md:text-right" : "md:order-1 md:text-left")}
          variants={sectionVariants}
        >
          <motion.h1 className="font-title text-4xl md:text-5xl font-bold mb-4" variants={sectionVariants}>
            {data.title}
          </motion.h1>
          <motion.p className="text-lg text-marhaban-charcoal dark:text-marhaban-gold/90" variants={sectionVariants}>
            {data.text}
          </motion.p>
          {data.badges?.length ? (
            <motion.ul
              className={clsx(
                "flex flex-wrap gap-3 text-sm font-medium text-marhaban-blue",
                isRTL ? "justify-end" : "justify-start"
              )}
              variants={sectionVariants}
            >
              {data.badges.map((badge, index) => (
                <motion.li
                  key={badge}
                  className="flex items-center gap-2 rounded-full border border-marhaban-gold/40 bg-marhaban-white/90 px-4 py-2 text-marhaban-blue shadow-soft dark:border-marhaban-gold/60 dark:bg-marhaban-blue/80 dark:text-marhaban-gold"
                  custom={index}
                  variants={staggerChildren}
                >
                  <span aria-hidden="true" className="text-base text-marhaban-gold dark:text-marhaban-gold">
                    •
                  </span>
                  {badge}
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
          {data.buttons?.length ? (
            <motion.div className={clsx("flex flex-wrap gap-4", isRTL ? "justify-end" : "justify-start")} variants={sectionVariants}>
              {data.buttons.map(({ label, href, variant = "primary", type = "anchor" }) => {
                const classes =
                  variant === "secondary"
                    ? "border border-marhaban-gold text-marhaban-blue py-3 px-6 rounded-xl hover:bg-marhaban-gold hover:text-white transition font-medium"
                    : "bg-marhaban-gold text-marhaban-blue font-semibold py-3 px-6 rounded-xl hover:bg-[#E8B930] transition";
                return type === "button" ? (
                  <button key={label} className={classes} onClick={() => (window.location.href = href)}>
                    {label}
                  </button>
                ) : (
                  <a key={label} href={href} className={classes}>
                    {label}
                  </a>
                );
              })}
            </motion.div>
          ) : null}
        </motion.div>
        <motion.div
          className={clsx(
            "relative flex justify-center md:order-2",
            isRTL ? "md:justify-start" : "md:justify-end"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="rounded-xl bg-marhaban-white/90 p-4 shadow-soft backdrop-blur dark:bg-marhaban-blue/80">
            <OptimizedImage
              srcJpg={HERO_MEDIA.base}
              srcWebp={HERO_MEDIA.webp}
              srcAvif={HERO_MEDIA.avif}
              alt={data.imageAlt}
              width={HERO_MEDIA.width}
              height={HERO_MEDIA.height}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full max-w-[420px] rounded-xl object-cover"
              srcSet={`${HERO_MEDIA.base} 1x, ${HERO_MEDIA.retina} 2x`}
              sizes={HERO_MEDIA.sizes}
            />
          </div>
        </motion.div>
      </Container>
    </motion.section>
  );
});

export default HeroSection;
