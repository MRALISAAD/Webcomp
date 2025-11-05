import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    { text: t("homeTestimonials.items.0.text"), author: t("homeTestimonials.items.0.author"), role: t("homeTestimonials.items.0.role") },
    { text: t("homeTestimonials.items.1.text"), author: t("homeTestimonials.items.1.author"), role: t("homeTestimonials.items.1.role") },
    { text: t("homeTestimonials.items.2.text"), author: t("homeTestimonials.items.2.author"), role: t("homeTestimonials.items.2.role") }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("testimonials.title")} subtitle={t("homeTestimonials.subtitle")} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card as="figure" interactive>
                <div className="mb-3 flex gap-0.5 text-gold">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-mutedLight dark:text-mutedDark">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  — {testimonial.author},{" "}
                  <span className="font-normal text-mutedLight dark:text-mutedDark">{testimonial.role}</span>
                </figcaption>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
};

export default Testimonials;
