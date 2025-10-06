import { useMemo, useState } from 'react';
import './App.css';

const SERVICE_OPTIONS = [
  'Transport',
  'Démarches administratives',
  'Orientation études',
  'Orientation travail',
  'Accompagnement complet',
];

function App() {
  const initialFormState = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      arrivalDate: '',
      serviceType: SERVICE_OPTIONS[0],
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || "Une erreur est survenue. Veuillez réessayer.");
      }

      setStatus({ type: 'success', message: body.message });
      setFormData(() => ({ ...initialFormState }));
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          "Nous n’avons pas pu envoyer votre demande pour le moment. Merci de réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <header className="hero" id="accueil">
        <nav className="main-nav">
          <span className="brand">Accompagnement Maroc → Canada</span>
          <div className="nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#services">Nos services</a>
            <a href="#about">À propos</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="hero__content">
          <p className="hero__subtitle">Votre relais de confiance dès votre arrivée au Canada</p>
          <h1 className="hero__title">De l’aéroport à l’appartement, sans stress.</h1>
          <p className="hero__mission">
            Notre mission : accompagner les Marocains qui immigrent, étudient ou travaillent au
            Canada pour qu’ils se sentent chez eux dès le premier jour.
          </p>
          <a className="hero__cta" href="#contact">
            Préparer mon arrivée
          </a>
        </div>
      </header>

      <main>
        <section className="section" id="services">
          <div className="section__header">
            <h2>Nos services</h2>
            <p>
              Une équipe locale pour prendre en charge chaque étape clé : transport, démarches,
              installation et orientation.
            </p>
          </div>
          <div className="services__grid">
            <article className="service-card">
              <h3>Transport &amp; installation</h3>
              <p>
                Accueil personnalisé à l’aéroport, transport jusqu’à votre logement et aide pour les
                premiers achats essentiels.
              </p>
            </article>
            <article className="service-card">
              <h3>Démarches administratives</h3>
              <p>
                Accompagnement pour le NAS/SIN, la RAMQ, l’ouverture de compte bancaire, le forfait
                téléphonique et toutes vos premières formalités.
              </p>
            </article>
            <article className="service-card">
              <h3>Orientation études &amp; travail</h3>
              <p>
                Conseils pratiques pour choisir vos programmes d’études, optimiser votre CV et
                comprendre le marché du travail local.
              </p>
            </article>
            <article className="service-card">
              <h3>Forfaits sur mesure</h3>
              <p>
                Des formules flexibles (transport, démarches ou accompagnement complet) adaptées à
                votre budget et à votre rythme.
              </p>
            </article>
          </div>
        </section>

        <section className="section section--accent" id="about">
          <div className="section__header">
            <h2>À propos</h2>
          </div>
          <div className="about__content">
            <p>
              Nous sommes une équipe de Marocains installés au Canada qui avons vécu les mêmes
              défis. Après nos propres parcours d’immigration, d’études et de travail, nous avons
              lancé ce service pour transmettre notre expérience et faciliter votre installation.
            </p>
            <p>
              Nos valeurs : la solidarité pour ne laisser personne seul, la simplicité pour vous
              guider pas à pas et la proximité pour rester à l’écoute de vos besoins réels.
            </p>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section__header">
            <h2>Contact &amp; formulaire d’intérêt</h2>
            <p>Partagez vos informations et nous vous recontactons sous 24 heures.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nom complet</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ex. Salma Benali"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optionnel"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="arrivalDate">Date d’arrivée prévue</label>
                <input
                  id="arrivalDate"
                  name="arrivalDate"
                  type="date"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceType">Service souhaité</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {status.message && (
              <p className={`form-status form-status--${status.type}`} role="status">
                {status.message}
              </p>
            )}
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer'}
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Accompagnement Maroc → Canada. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
