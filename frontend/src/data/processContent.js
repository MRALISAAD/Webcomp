import { Plane, Home, Briefcase, HeartHandshake, GraduationCap } from "lucide-react";

const stepsConfig = [
  { id: 1, icon: GraduationCap, color: "text-rose-600" },
  { id: 2, icon: Briefcase, color: "text-emerald-600" },
  { id: 3, icon: Home, color: "text-sky-600" },
  { id: 4, icon: Plane, color: "text-red-600" },
  { id: 5, icon: HeartHandshake, color: "text-violet-600" },
];

const processContent = {
  fr: {
    direction: "ltr",
    title: "Votre accompagnement en 5 étapes simples",
    subtitle: "Un parcours humain, structuré et rassurant pour réussir votre installation.",
    steps: [
      {
        ...stepsConfig[0],
        title: "Avant votre départ",
        text: "Préparation complète, checklist personnalisée et conseils pratiques pour anticiper chaque étape.",
      },
      {
        ...stepsConfig[1],
        title: "Accueil à l’aéroport",
        text: "Prise en charge rapide, transfert vers votre logement et assistance sur les premières formalités.",
      },
      {
        ...stepsConfig[2],
        title: "Installation logement",
        text: "Aide à la recherche, conseils budgétaires (≤35 % du revenu brut) et sécurisation de votre logement.",
      },
      {
        ...stepsConfig[3],
        title: "Démarches administratives",
        text: "NAS, ouverture bancaire, carte SIM, assurances : nous planifions et suivons chaque rendez-vous.",
      },
      {
        ...stepsConfig[4],
        title: "Suivi & intégration",
        text: "Assistance continue, ressources officielles et points de suivi réguliers pour avancer sereinement.",
      },
    ],
    cta: {
      title: "Prêt à commencer votre installation ?",
      button: "Réserver maintenant",
      href: "/contact",
    },
  },
  en: {
    direction: "ltr",
    title: "Your support delivered in 5 simple steps",
    subtitle: "A human, structured journey so you can settle in Canada with confidence.",
    steps: [
      {
        ...stepsConfig[0],
        title: "Before departure",
        text: "Comprehensive preparation, personalised checklist, and practical advice so nothing is left to chance.",
      },
      {
        ...stepsConfig[1],
        title: "Airport welcome",
        text: "Fast pickup, transfer to your housing, and support with your first on-site actions.",
      },
      {
        ...stepsConfig[2],
        title: "Housing installation",
        text: "Housing search, budget guidance (≤35% of gross income), and secure booking assistance.",
      },
      {
        ...stepsConfig[3],
        title: "Paperwork",
        text: "SIN, banking, SIM card, insurance: we schedule, prepare, and follow up on each appointment.",
      },
      {
        ...stepsConfig[4],
        title: "Follow-up",
        text: "Continuous assistance, official resources, and regular check-ins to keep you on track.",
      },
    ],
    cta: {
      title: "Ready to start your settlement?",
      button: "Book now",
      href: "/packs",
    },
  },
  ar: {
    direction: "rtl",
    title: "رحلة مرحباً في خمس مراحل",
    subtitle: "منهجية بسيطة وإنسانية وفعالة لتجعل وصولكم إلى كندا سلساً.",
    steps: [
      {
        ...stepsConfig[0],
        title: "التحضير",
        text: "تشخيص شامل، خطة طريق مخصصة، ووصول إلى منصتكم الخاصة للتخطيط براحة تامة.",
      },
      {
        ...stepsConfig[1],
        title: "الإجراءات",
        text: "حجز مواعيد رقم التأمين الاجتماعي، البنك، التأمين الصحي، وخط الهاتف في مرافقة واحدة.",
      },
      {
        ...stepsConfig[2],
        title: "السكن",
        text: "بحث وتحقق وحجز آمن لسكنكم المؤقت أو الدائم.",
      },
      {
        ...stepsConfig[3],
        title: "يوم الوصول",
        text: "استقبال في المطار، نقل إلى السكن، تسليم المفاتيح، ومساعدة في خطوات الاستقرار الأولى.",
      },
      {
        ...stepsConfig[4],
        title: "المتابعة والاندماج",
        text: "دعم واتساب، تحديثات مؤتمتة، نقاط متابعة أسبوعية، ومساندة للاندماج.",
      },
    ],
    cta: {
      title: "مستعدون لوصول بلا توتر؟",
      button: "اكتشفوا باقاتنا",
      href: "/packs",
    },
  },
};

export default processContent;
