import dayjs from "../lib/dayjs";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
}

const defaultCover = "/images/montreal-skyline-night.jpg";

export const blogPosts: BlogPost[] = [
  {
    slug: "erreurs-a-eviter-arrivee-canada",
    title: "Les 5 erreurs à éviter en arrivant au Canada",
    excerpt:
      "Anticipez votre installation au Canada avec notre liste des pièges fréquents et des solutions concrètes pour les éviter.",
    content: `
## 1. Attendre l'arrivée pour lancer ses démarches
Les délais administratifs peuvent rallonger considérablement vos premières semaines. Préparez vos preuves de résidence et vos documents bancaires avant le départ.

## 2. Négliger l'assurance santé
Sans assurance privée, les premiers mois peuvent être coûteux. Nous guidons chaque client Standard et Premium pour obtenir une couverture temporaire.

## 3. Sous-estimer le marché locatif
Votre dossier doit montrer solvabilité et références. Nous constituons un dossier complet et validons des logements selon votre profil.

## 4. Oublier le réseau local
Arrivée isolée rime avec stress. Nos orientations locales vous connectent aux bonnes ressources (transports, commerces, communauté).

## 5. Ne pas planifier son budget d'installation
Frais de dépôt, mobilier, transports : créez un budget réaliste. Nos coachs partagent un modèle prêt à l'emploi.
    `,
    coverImage: defaultCover,
    publishedAt: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
    readingMinutes: 6,
    tags: ["Installation", "Conseils"]
  },
  {
    slug: "trouver-logement-depuis-etranger",
    title: "Trouver un logement depuis l’étranger : guide pratique",
    excerpt:
      "Nos spécialistes vous expliquent comment sécuriser un bail avant l’arrivée et comprendre les exigences des propriétaires.",
    content: `
## Comprendre les attentes des propriétaires
La fiche de solvabilité, les preuves d’emploi et les références sont essentielles. Nous préparons ces dossiers avec vous et contactons les propriétaires à votre nom.

## Visites en visioconférence
Nos concierges effectuent des visites en direct, partagent des vidéos HD et vérifient chaque détail du logement.

## Signature à distance sécurisée
Nous accompagnons la signature en ligne et la remise de dépôt avec des partenaires juridiques reconnus.
    `,
    coverImage: defaultCover,
    publishedAt: dayjs().subtract(5, "month").format("YYYY-MM-DD"),
    readingMinutes: 5,
    tags: ["Logement"]
  },
  {
    slug: "demarches-essentielles-arrivee",
    title: "Démarches essentielles dès l’arrivée",
    excerpt:
      "NAS, banque, téléphone, assurance : la check-list complète pour vos 10 premiers jours sur le sol canadien.",
    content: `
## Jour 1 à 3 : NAS et banque
Nous réservons les rendez-vous à l'avance et préparons les justificatifs pour accélérer chaque étape.

## Jour 4 à 7 : logement et services essentiels
Activation de l'électricité, internet, assurance habitation : on vous guide pas à pas avec des procédures actualisées.

## Jour 8 à 10 : intégration locale
Carte transport, téléphone, ouverture de compte communauté : votre concierge vous oriente vers les partenaires adaptés.
    `,
    coverImage: defaultCover,
    publishedAt: dayjs().subtract(4, "month").format("YYYY-MM-DD"),
    readingMinutes: 4,
    tags: ["Démarches"]
  },
  {
    slug: "etudier-au-quebec-etapes",
    title: "Étudier au Québec : étapes administratives",
    excerpt:
      "Du CAQ à la RAMQ, découvrez le parcours complet pour étudiants internationaux venus s’installer au Québec.",
    content: `
## Avant le départ
Nous validons votre CAQ, permis d'étude et attestations de fonds. Nos partenaires offrent des solutions bancaires adaptées.

## À l'arrivée
Récupération des cartes étudiantes, ouverture de compte, assurance santé : notre équipe vous accompagne sur site.

## Pendant l'année
Renouvellement des statuts et conseils pour stages ou emplois étudiants, avec coaching CV et entretiens.
    `,
    coverImage: defaultCover,
    publishedAt: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    readingMinutes: 7,
    tags: ["Études", "Québec"]
  },
  {
    slug: "meilleures-banques-nouveaux-arrivants",
    title: "Les meilleures banques pour nouveaux arrivants",
    excerpt:
      "Comparatif des offres bancaires qui facilitent l’installation des nouveaux arrivants au Canada.",
    content: `
## Critères de sélection
Frais bancaires, limites de cartes de crédit, programmes de points et partenaires d'installation.

## Nos partenaires
Nous travaillons avec des institutions qui reconnaissent les dossiers internationaux et proposent des cartes de crédit dès l'arrivée.

## Comment ouvrir votre compte
Selon votre pack, nous préparons votre dossier, réservons les rendez-vous et accompagnons chaque signature.
    `,
    coverImage: defaultCover,
    publishedAt: dayjs().subtract(2, "month").format("YYYY-MM-DD"),
    readingMinutes: 6,
    tags: ["Banque", "Finance"]
  }
];
