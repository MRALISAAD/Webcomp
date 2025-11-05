import { useTranslation } from "react-i18next";
import Container from "../Container";
import Card from "../layout/Card";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import ContactForm from "../Form/ContactForm";

const LeadFormSection = () => {
  const { t } = useTranslation();

  return (
    <SectionShell>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title={t("homeLeadForm.title")} subtitle={t("homeLeadForm.subtitle")} />
          <Card className="mt-10 ring-1 ring-gold/10 backdrop-blur dark:ring-gold/20" tone="translucent" padding="lg">
            <ContactForm />
          </Card>
        </div>
      </Container>
    </SectionShell>
  );
};

export default LeadFormSection;
