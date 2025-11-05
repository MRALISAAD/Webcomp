import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const PacksComparison = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Table data for comparison
  const features = [
    { label: t("packs.table.airportWelcome"), essentiel: false, confort: true, premium: true },
    { label: t("packs.table.procedures"), essentiel: true, confort: true, premium: true },
    { label: t("packs.table.housing"), essentiel: false, confort: true, premium: true },
    { label: t("packs.table.transport"), essentiel: false, confort: false, premium: true },
    { label: t("packs.table.advice"), essentiel: true, confort: true, premium: true },
    { label: t("packs.table.support"), essentiel: "7j", confort: "15j", premium: "30j" },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Check className="h-4 w-4" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600">
          <X className="h-4 w-4" />
        </span>
      );
    }
    return (
      <span className="text-sm font-medium text-textMain dark:text-gray-300">{value}</span>
    );
  };

  return (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="overflow-x-auto rounded-2xl shadow-lg border-2 border-lightGray bg-white dark:bg-zinc-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-primary text-white font-bold">
              <th className={`px-6 py-4 text-left rounded-tl-2xl ${isRTL ? "text-right rounded-tl-none rounded-tr-2xl" : ""}`}>
                {t("packs.table.features")}
              </th>
              <th className="px-6 py-4 text-center">
                Essentiel
                <div className="text-sm font-normal opacity-90 mt-1">299 $</div>
              </th>
              <th className="px-6 py-4 text-center">
                Confort
                <div className="text-sm font-normal opacity-90 mt-1">599 $</div>
              </th>
              <th className={`px-6 py-4 text-center last:rounded-tr-2xl ${isRTL ? "last:rounded-tr-none last:rounded-tl-2xl" : ""}`}>
                Premium
                <div className="text-sm font-normal opacity-90 mt-1">999 $</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIndex) => (
              <tr
                key={feature.label}
                className={`border-b border-lightGray transition hover:bg-beige/50 ${
                  rowIndex % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-beige/30 dark:bg-zinc-800/50"
                }`}
              >
                <th
                  scope="row"
                  className={`px-6 py-4 font-semibold text-textMain dark:text-textLight ${isRTL ? "text-right" : "text-left"}`}
                >
                  {feature.label}
                </th>
                <td className="px-6 py-4 text-center">
                  {renderCell(feature.essentiel)}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(feature.confort)}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(feature.premium)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Button
          asChild
          size="lg"
          className="rounded-2xl bg-primary px-8 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primaryLight hover:shadow-xl"
        >
          <Link to="/contact">{t("cta.reserve")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PacksComparison;
