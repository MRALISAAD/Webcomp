declare module "../data/partnersContent" {
  export interface PartnersContent {
    title: string;
    subtitle: string;
    intro: string;
    benefits: Array<{
      icon: React.ComponentType;
      title: string;
      text: string;
    }>;
    categories: Array<{
      icon: React.ComponentType;
      title: string;
      text: string;
    }>;
    cta: {
      title: string;
      text: string;
      button: string;
      href: string;
    };
  }

  const partnersContent: {
    fr: PartnersContent;
    en: PartnersContent;
    ar: PartnersContent;
  };
  
  export default partnersContent;
}
