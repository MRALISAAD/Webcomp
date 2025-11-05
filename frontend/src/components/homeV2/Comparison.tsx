import { useTranslation } from "react-i18next";
import Container from "../Container";
import SectionHeading from "../layout/SectionHeading";
import SectionShell from "../layout/SectionShell";
import { Check, Minus } from "lucide-react";

const valueRenderer = (value: string) => {
  if (value === "check") {
    return <Check className="mx-auto h-5 w-5 text-[#D4AF37]" aria-hidden="true" />;
  }
  if (value === "dash") {
    return <Minus className="mx-auto h-5 w-5 text-mutedLight dark:text-mutedDark" aria-hidden="true" />;
  }
  return <span>{value}</span>;
};

const Comparison = () => {
  const { t } = useTranslation();
  const headers = t("home.comparison.headers", { returnObjects: true }) as string[];
  const rows = t("home.comparison.rows", { returnObjects: true }) as Array<{ service: string; values: string[] }>;

  return (
    <SectionShell>
      <Container>
        <SectionHeading title={t("home.comparison.title")} subtitle={t("home.comparison.subtitle")} />
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-white shadow-[0_20px_60px_-35px_rgba(10,34,57,0.45)] transition-colors duration-300 dark:bg-[#112A46]">
          <table className="min-w-full divide-y divide-[#D4AF37]/15 text-sm">
            <thead className="bg-[#F5EEE1] text-[#0A2239] dark:bg-[#0D2340] dark:text-[#EAEAEA]">
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-4 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {rows.map((row) => (
                <tr key={row.service} className="odd:bg-white even:bg-[#FDF9F1] dark:odd:bg-[#112A46] dark:even:bg-[#0D2340]">
                  <td className="px-6 py-4 text-left font-medium">{row.service}</td>
                  {row.values.map((value, index) => (
                    <td key={`${row.service}-${index}`} className="px-6 py-4 text-center font-semibold text-[#0A2239] dark:text-[#EAEAEA]">
                      {valueRenderer(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </SectionShell>
  );
};

export default Comparison;
