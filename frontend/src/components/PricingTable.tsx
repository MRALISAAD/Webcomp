import { CheckIcon, MinusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pricingPacks, packFeatures } from "../data/packs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const PricingTable = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="space-y-6" id="packs">
      <div className="max-w-2xl space-y-3">
        <h2 className="text-3xl font-semibold text-ink dark:text-textLight">{t("pricing.title")}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t("pricing.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingPacks.map((pack) => (
          <div
            key={pack.id}
            id={pack.id}
            className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink dark:text-textLight">{pack.name}</h3>
              {pack.badge && (
                <Badge variant={pack.id === "premium" ? "secondary" : "default"}>
                  {pack.badge}
                </Badge>
              )}
            </div>
            <p className="text-3xl font-bold text-ink dark:text-textLight">{pack.price}</p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{pack.description}</p>
            <Button asChild className="mt-6" variant={pack.id === "standard" ? "secondary" : "default"}>
              <Link to={{ pathname: "/contact" }} state={{ desiredPack: pack.name }}>
                {pack.cta[i18n.language === "en" ? "en" : "fr"]}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-ink dark:text-textLight">{t("pricing.featuresLabel")}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              {pricingPacks.map((pack) => (
                <TableHead key={pack.id}>{pack.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {packFeatures.map((feature) => (
              <TableRow key={feature.label}>
                <TableCell className="font-medium">{feature.label}</TableCell>
                {pricingPacks.map((pack) => (
                  <TableCell key={`${feature.label}-${pack.id}`} className="text-center">
                    {feature.tierAvailability[pack.id] ? (
                      <CheckIcon className="mx-auto h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <MinusIcon className="mx-auto h-5 w-5 text-zinc-300" aria-hidden="true" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PricingTable;
