import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const About = () => {
  const { t, i18n } = useTranslation();
  const values = t("about.values", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  const team = t("about.team", { returnObjects: true }) as Array<{
    name: string;
    role: string;
  }>;

  const seo = t("seo.about", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };
  const og = getOpenGraph({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA"
  });

  return (
    <div className="space-y-12">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={buildCanonicalUrl(seo.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-ink dark:text-white">{t("about.title")}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t("about.mission")}</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-ink dark:text-white">{t("about.valuesTitle")}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="h-full">
              <CardContent className="space-y-3">
                <CardTitle>{value.title}</CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-ink dark:text-white">{t("about.teamTitle")}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <img
                src="/images/team/placeholder.svg"
                alt={member.name}
                loading="lazy"
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-semibold text-ink dark:text-white">{member.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
