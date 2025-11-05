import { useTranslation } from "react-i18next";
// @ts-expect-error - JS component without types
import Accordion from "../Accordion.jsx";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";

const FAQ = () => {
  const { t } = useTranslation();

  const items = [
    { q: t("homeFAQ.items.0.question"), a: t("faq.items.0.answer") },
    { q: t("homeFAQ.items.1.question"), a: t("faq.items.1.answer") },
    { q: t("homeFAQ.items.2.question"), a: t("faq.items.4.answer") },
    { q: t("homeFAQ.items.3.question"), a: t("faq.items.3.answer") }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("faq.title")} subtitle={t("faq.intro")} />
        <Card className="mt-8" interactive padding="lg">
          <Accordion items={items} />
        </Card>
      </Container>
    </SectionShell>
  );
};

export default FAQ;
