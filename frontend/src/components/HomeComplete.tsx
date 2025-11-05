import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Check, 
  MessageCircle, 
  Mail, 
  MapPin, 
  FileText, 
  Home as HomeIcon, 
  GraduationCap, 
  Lock, 
  Users, 
  TrendingUp, 
  Zap, 
  Facebook, 
  Instagram, 
  Linkedin 
} from "lucide-react";
import Container from "./Container";
// @ts-expect-error: typed by ambient d.ts
import { sectionVariants, staggerChildren } from "../utils/animations.js";
import { Button } from "./ui/button";

const HomeComplete = () => {
  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F1] via-white to-[#FAF6F1] py-20 md:py-28">
        <Container>
          <motion.div
            className="grid gap-12 md:grid-cols-2 md:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="space-y-6" variants={sectionVariants}>
              <h1 className="text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
                Marhaban Canada — Votre arrivée au Canada, sans stress
              </h1>
              <p className="text-lg leading-relaxed text-zinc-700 md:text-xl">
                Bienvenue chez Marhaban Canada, votre partenaire de confiance pour une installation réussie au Canada.
                Notre mission : vous accompagner avant, pendant et après votre arrivée, pour que votre nouvelle vie commence sans tracas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#C1121F] hover:bg-[#A00F1A] text-white">
                  <Link to="/packs">
                    Découvrir nos packs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                  <Link to="/contact">
                    Contactez-nous
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">
                <img
                  src="/images/airport-arrival.jpg"
                  alt="Famille arrivant à l'aéroport du Canada"
                  className="h-auto w-full rounded-2xl object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 2 - Pourquoi choisir Marhaban Canada */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Pourquoi choisir Marhaban Canada ?
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                Nous comprenons que déménager dans un nouveau pays peut être complexe. C'est pourquoi nous avons créé une solution simple, humaine et efficace.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { emoji: "🤝", title: "Accompagnement humain personnalisé", desc: "Nos conseillers vous guident étape par étape selon votre profil : étudiant, travailleur ou famille." },
                { emoji: "🧳", title: "Démarches simplifiées", desc: "Nous vous aidons à obtenir rapidement votre NAS, compte bancaire, carte SIM et logement temporaire." },
                { emoji: "🌍", title: "Présence au Québec et bientôt partout au Canada", desc: "Nous travaillons avec des partenaires locaux dans les principales villes pour vous assurer un accueil complet." },
                { emoji: "🔒", title: "Plateforme automatisée et sécurisée", desc: "Grâce à Zoho CRM et n8n, nous gérons vos informations en toute confidentialité." },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl bg-[#FAF6F1] p-6 shadow-lg"
                  variants={staggerChildren}
                  custom={index}
                >
                  <div className="mb-4 text-4xl">{card.emoji}</div>
                  <h3 className="mb-3 text-xl font-semibold text-ink">{card.title}</h3>
                  <p className="text-zinc-600">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section 3 - Nos formules d'accompagnement */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF6F1]">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Nos formules d'accompagnement
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                Choisissez le pack qui correspond le mieux à vos besoins et à votre budget.
                Chaque formule comprend un accompagnement humain et des outils digitaux.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { 
                  name: "Pack Essentiel", 
                  price: "299 $", 
                  features: [
                    "Assistance pour NAS, banque et carte SIM",
                    "Accueil virtuel",
                    "Conseils d'installation",
                    "Suivi par courriel"
                  ],
                  popular: false
                },
                { 
                  name: "Pack Confort", 
                  price: "599 $", 
                  features: [
                    "Accueil à l'aéroport",
                    "Aide pour logement temporaire",
                    "Accompagnement complet des démarches",
                    "Assistance jusqu'à l'intégration"
                  ],
                  popular: true
                },
                { 
                  name: "Pack Premium", 
                  price: "999 $", 
                  features: [
                    "Service personnalisé",
                    "Logement garanti",
                    "Transport aéroport inclus",
                    "Suivi et accompagnement illimité"
                  ],
                  popular: false
                }
              ].map((pack, index) => (
                <motion.div
                  key={index}
                  className={`rounded-3xl border-2 bg-white p-8 shadow-xl ${pack.popular ? 'border-[#2E7D32] ring-4 ring-[#2E7D32] ring-opacity-20' : 'border-zinc-200'}`}
                  variants={staggerChildren}
                  custom={index}
                >
                  {pack.popular && (
                    <div className="mb-2">
                      <span className="inline-flex items-center rounded-full bg-[#2E7D32] px-3 py-1 text-sm font-semibold text-white">
                        Populaire
                      </span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-ink">{pack.name}</h3>
                    <span className="text-3xl font-bold text-[#C1121F]">{pack.price}</span>
                  </div>
                  <ul className="space-y-3">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-700">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#2E7D32]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Button asChild size="lg" className="bg-[#2E7D32] hover:bg-[#255d28] text-white">
                <Link to="/packs">
                  Comparer les packs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 4 - Comment ça marche */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                Nous avons simplifié le processus pour que votre installation soit fluide et agréable.
              </p>
            </motion.div>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-[#C1121F] to-[#2E7D32] hidden md:block"></div>
              <div className="space-y-12">
                {[
                  { step: "1", title: "Avant votre arrivée", desc: "Préparation de vos documents et réservations" },
                  { step: "2", title: "Arrivée à l'aéroport", desc: "Accueil personnalisé" },
                  { step: "3", title: "Installation", desc: "Aide pour NAS, banque, logement" },
                  { step: "4", title: "Intégration", desc: "Conseils pratiques" },
                  { step: "5", title: "Suivi", desc: "Contact continu via WhatsApp et email" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col gap-6 md:flex-row md:items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                    variants={staggerChildren}
                    custom={index}
                  >
                    <div className="w-full md:w-1/2 md:px-12">
                      <div className="rounded-2xl bg-[#FAF6F1] p-6 shadow-lg">
                        <div className="mb-3 flex items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C1121F] text-xl font-bold text-white">
                            {item.step}
                          </span>
                          <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                        </div>
                        <p className="text-zinc-600">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Button asChild variant="outline" size="lg" className="border-[#C1121F] text-[#C1121F] hover:bg-[#C1121F] hover:text-white">
                <Link to="/processus">
                  Découvrir le processus complet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 5 - Témoignages */}
      <section className="py-20 bg-gradient-to-b from-[#FAF6F1] to-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Ils nous ont fait confiance
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                Découvrez les témoignages de nos clients heureux d'avoir choisi Marhaban Canada.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { text: "Service professionnel et humain. Je recommande à tous les nouveaux arrivants.", author: "Samira", role: "étudiante à l'UQAM" },
                { text: "Grâce à eux, j'ai trouvé un logement et obtenu mon NAS en 3 jours.", author: "Youssef", role: "travailleur à Québec" },
                { text: "Très bon accompagnement, on se sent en confiance dès le premier contact.", author: "Nadia", role: "famille à Longueuil" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-lg"
                  variants={staggerChildren}
                  custom={index}
                >
                  <p className="mb-4 text-zinc-700">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-ink">— {testimonial.author}</div>
                    <div className="text-sm text-zinc-600">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Button asChild variant="outline" size="lg" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                <Link to="/testimonials">
                  Voir plus de témoignages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 6 - Guides et ressources */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Guides et ressources
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                Accédez à nos outils et guides pour une arrivée réussie.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: FileText, title: "Guide NAS et Banque au Canada" },
                { icon: HomeIcon, title: "Trouver un logement facilement" },
                { icon: GraduationCap, title: "Étudier et travailler au Québec" },
              ].map((guide, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl border-2 border-zinc-200 bg-[#FAF6F1] p-6 transition-all hover:border-[#2E7D32] hover:shadow-lg"
                  variants={staggerChildren}
                  custom={index}
                >
                  <guide.icon className="mb-4 h-12 w-12 text-[#C1121F]" />
                  <h3 className="text-lg font-semibold text-ink">{guide.title}</h3>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Button asChild size="lg" className="bg-[#C1121F] hover:bg-[#A00F1A] text-white">
                <Link to="/blog">
                  Explorer les ressources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 7 - CTA Contact */}
      <section className="py-20 bg-gradient-to-br from-[#C1121F] to-[#2E7D32] text-white">
        <Container>
          <motion.div
            className="text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.h2 className="text-3xl font-bold md:text-4xl" variants={sectionVariants}>
              Prêt à commencer votre nouvelle vie au Canada ?
            </motion.h2>
            <motion.p className="mx-auto max-w-3xl text-lg opacity-90" variants={sectionVariants}>
              Notre équipe est à votre disposition pour vous accompagner à chaque étape.
              Contactez-nous dès maintenant et préparez votre arrivée.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4" variants={sectionVariants}>
              <Button asChild size="lg" className="bg-white text-[#C1121F] hover:bg-zinc-100">
                <a href="https://wa.me/15141234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#C1121F]">
                <a href="mailto:contact@marhabancanada.ca">
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#C1121F]">
                <Link to="/booking">
                  Réserver un pack
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 8 - Notre présence au Canada */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.h2 className="text-3xl font-bold text-ink md:text-4xl" variants={sectionVariants}>
              Notre présence au Canada
            </motion.h2>
            <motion.p className="mx-auto max-w-3xl text-lg text-zinc-600" variants={sectionVariants}>
              Marhaban Canada est déjà actif dans plusieurs régions du Québec, notamment Montréal, Laval, Longueuil et Québec.
              Nous étendons nos services à travers tout le Canada : Ontario, Alberta, Colombie-Britannique et plus encore.
            </motion.p>
            <motion.div className="flex justify-center" variants={sectionVariants}>
              <MapPin className="h-16 w-16 text-[#2E7D32]" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 9 - Notre technologie */}
      <section className="py-20 bg-[#FAF6F1]">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Notre technologie au service de votre installation
              </h2>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Zap, text: "Automatisation intelligente — nos outils gèrent vos formulaires et suivis." },
                { icon: Lock, text: "Sécurité et confidentialité — vos données sont protégées via Zoho." },
                { icon: TrendingUp, text: "Plateforme intuitive — suivez votre dossier en ligne." },
                { icon: Users, text: "Support réactif — nos équipes répondent 7j/7." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={staggerChildren}
                  custom={index}
                >
                  <item.icon className="mx-auto mb-4 h-12 w-12 text-[#C1121F]" />
                  <p className="text-zinc-700">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section 10 - FAQ */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-4" variants={sectionVariants}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Questions fréquentes
              </h2>
            </motion.div>
            <div className="mx-auto max-w-3xl space-y-4">
              {[
                "Combien de temps faut-il pour obtenir mon NAS ?",
                "Aidez-vous pour trouver un logement ?",
                "Puis-je payer mon pack après mon arrivée ?",
                "Comment fonctionne le suivi après l'installation ?",
              ].map((question, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border-2 border-zinc-200 bg-[#FAF6F1] p-6"
                  variants={staggerChildren}
                  custom={index}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-ink">{question}</h3>
                    <ArrowRight className="h-购房 w-6 text-[#C1121F]" />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Button asChild size="lg" className="bg-[#2E7D32] hover:bg-[#255d28] text-white">
                <Link to="/faq">
                  Voir toutes les FAQ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 11 - Restez connectés */}
      <section className="py-20 bg-gradient-to-r from-[#C1121F] to-[#2E7D32] text-white">
        <Container>
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.h2 className="text-3xl font-bold md:text-4xl" variants={sectionVariants}>
              Restez connectés
            </motion.h2>
            <motion.p className="text-lg opacity-90" variants={sectionVariants}>
              Suivez Marhaban Canada sur nos réseaux pour ne rien manquer :
            </motion.p>
            <motion.div className="flex justify-center gap-6" variants={sectionVariants}>
              <a href="#" className="rounded-full bg-white/10 p-4 hover:bg-white/20 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-4 hover:bg-white/20 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-4 hover:bg-white/20 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Section 12 - Footer Info */}
      <section className="py-20 bg-zinc-900 text-white">
        <Container>
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div className="text-center space-y-6" variants={sectionVariants}>
              <h2 className="text-3xl font-bold md:text-4xl">À propos de Marhaban Canada</h2>
              <p className="mx-auto max-w-3xl text-lg text-zinc-300">
                Marhaban Canada est une initiative née de la volonté d'aider les nouveaux arrivants à s'installer sereinement.
                Nous croyons à la force de la communauté et à l'importance d'un accompagnement humain.
                Basés à Longueuil, nous travaillons avec des partenaires locaux dans tout le Québec.
              </p>
            </motion.div>
            <motion.div className="flex flex-wrap justify-center gap-8 text-zinc-300" variants={sectionVariants}>
              <Link to="/about" className="hover:text-white">À propos</Link>
              <Link to="/faq" className="hover:text-white">FAQ</Link>
              <Link to="/packs" className="hover:text-white">Packs</Link>
              <Link to="/blog" className="hover:text-white">Blog</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </motion.div>
            <motion.div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400" variants={sectionVariants}>
              <p>Contact : <a href="mailto:contact@marhabancanada.ca" className="text-white hover:underline">contact@marhabancanada.ca</a></p>
              <p className="mt-2">© 2025 Marhaban Canada — Tous droits réservés</p>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default HomeComplete;
