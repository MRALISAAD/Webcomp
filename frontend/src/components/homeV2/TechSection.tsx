import { Lock, Zap, Cloud, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";

const TechSection = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Zap, title: t("homeTech.items.0.title"), description: t("homeTech.items.0.description") },
    { icon: Lock, title: t("homeTech.items.1.title"), description: t("homeTech.items.1.description") },
    { icon: Cloud, title: t("homeTech.items.2.title"), description: t("homeTech.items.2.description") },
    { icon: Headphones, title: t("homeTech.items.3.title"), description: t("homeTech.items.3.description") }
  ];

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("homeTech.title")} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <Card key={idx} interactive className="text-center">
              <item.icon className="mx-auto mb-3 h-10 w-10 text-gold" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-mutedLight dark:text-mutedDark">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
};

export default TechSection;
