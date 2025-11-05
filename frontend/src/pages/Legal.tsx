import { Helmet } from "react-helmet-async";

const Legal = () => (
  <div className="prose dark:prose-invert max-w-3xl">
    <Helmet>
      <title>Mentions légales — Marhaban Canada</title>
    </Helmet>
    <h1>Mentions légales</h1>
    <p>
      Marhaban Canada Inc. est une société enregistrée au Québec, dédiée à
      l’accompagnement des nouveaux arrivants. Le présent site a pour objectif de
      présenter nos services d’accueil et de suivi, ainsi que de recueillir les
      demandes d’information des personnes souhaitant bénéficier de notre
      expertise.
    </p>

    <h2>Informations de contact</h2>
    <ul>
      <li>Courriel : <a href="mailto:contact@marhabancanada.ca">contact@marhabancanada.ca</a></li>
      <li>Téléphone : +1 (514) 555-0000</li>
      <li>Siège social : Montréal, Québec, Canada</li>
    </ul>

    <h2>Responsabilité</h2>
    <p>
      Les contenus publiés sur ce site sont fournis à titre informatif. Malgré
      le soin apporté à leur rédaction, Marhaban Canada Inc. ne saurait être
      tenue responsable d’erreurs ou d’omissions. Nous nous réservons le droit de
      modifier ou de mettre à jour ces informations à tout moment.
    </p>

    <h1>Politique de confidentialité</h1>
    <p>
      Marhaban Canada Inc. attache une grande importance à la protection des
      données personnelles. Les informations collectées par nos formulaires sont
      utilisées exclusivement pour répondre à votre demande, préparer votre plan
      d’installation et vous accompagner dans votre projet.
    </p>
    <ul>
      <li>Aucune donnée n’est vendue ou partagée avec des tiers non autorisés.</li>
      <li>
        Les informations sont stockées de manière sécurisée et accessibles
        uniquement à notre équipe d’accompagnement.
      </li>
      <li>
        Vous pouvez demander la consultation, la rectification ou la suppression
        de vos données en écrivant à
        <a href="mailto:privacy@marhabancanada.ca"> privacy@marhabancanada.ca</a>.
      </li>
    </ul>

    <h2>Durée de conservation</h2>
    <p>
      Les données collectées sont conservées pendant la durée nécessaire au
      traitement de votre dossier, puis archivées pour une période maximale de
      vingt-quatre mois à des fins de suivi administratif.
    </p>

    <h2>Zoho CRM et Zoho Mail</h2>
    <p>
      Nos formulaires sont connectés à Zoho CRM et Zoho Mail afin d’assurer un
      suivi professionnel et centralisé. Les traitements réalisés via ces outils
      respectent les conditions d’utilisation et la politique de confidentialité
      de Zoho Corporation.
    </p>

    <p>
      © 2025 Marhaban Canada — Votre arrivée sans stress. Les données collectées
      sont strictement confidentielles et utilisées uniquement pour votre
      accompagnement.
    </p>
  </div>
);

export default Legal;
