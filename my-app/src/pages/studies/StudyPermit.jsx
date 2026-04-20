import { useState, useEffect } from "react";
import "../../css/VisitorVisa.css";

const NAV_LINKS = [
  { label: "Résidence temporaire", href: "/residence-temporaire" },
  { label: "Études", href: "#" },
  { label: "Travail", href: "#" },
  { label: "Résidence permanente", href: "#" },
  { label: "Consultation", href: "#", cta: true },
];

const VISA_TYPES = [
  {
    num: "01",
    name: "Visa de visiteur (TRV)",
    badge: "Passeport requis",
    badgeStyle: "gold",
    desc: "Le visa de visiteur, aussi appelé Titre de voyage de résident temporaire (TRV), est obligatoire pour les ressortissants de certains pays souhaitant entrer au Canada pour du tourisme, rendre visite à de la famille ou assister à des événements d'affaires courts. Il est généralement valide jusqu'à 10 ans ou jusqu'à l'expiration de votre passeport.",
  },
  {
    num: "02",
    name: "Autorisation de voyage électronique (AVE)",
    badge: "Pays exemptés",
    badgeStyle: "blue",
    desc: "L'AVE est requise pour les ressortissants de pays exemptés de visa qui voyagent au Canada par avion. Elle est liée électroniquement à votre passeport, coûte 7 CAD et est valide 5 ans ou jusqu'à l'expiration de votre passeport. Elle n'est pas nécessaire si vous entrez par voie terrestre ou maritime.",
  },
];

const REQUIREMENTS = [
  "Passeport valide pour toute la durée du séjour",
  "Preuve de liens solides avec votre pays d'origine (emploi, famille, biens)",
  "Preuve de moyens financiers suffisants pour le séjour",
  "Lettre d'invitation d'un hôte canadien (si applicable)",
  "Assurance voyage recommandée",
  "Photos conformes aux normes d'Immigration Canada",
  "Formulaire IMM 5257 complété",
  "Frais de traitement : 100 CAD",
];

const TIMELINE = [
  { step: "Évaluation du dossier", detail: "Vérification de l'admissibilité et du type de visa approprié" },
  { step: "Préparation des documents", detail: "Collecte et vérification de tous les documents requis" },
  { step: "Soumission de la demande", detail: "Dépôt en ligne via le portail IRCC" },
  { step: "Traitement", detail: "Délai moyen de 14 à 30 jours selon le bureau" },
  { step: "Décision finale", detail: "Approbation, refus ou demande d'informations supplémentaires" },
];

export default function VisitorVisa() {
  const [scrolled, setScrolled] = useState(false);
  const [openCard, setOpenCard] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleCard = (i) => setOpenCard(openCard === i ? null : i);

  return (
    <div className="visitor-visa">

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a href="/" className="nav__logo">
            <span className="logo__a">A2K</span>
            <span className="logo__sub">IMMIGRATION</span>
          </a>
          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={l.cta ? "nav__cta" : "nav__link"}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <ol className="breadcrumb__list">
          <li className="breadcrumb__item"><a href="/">Accueil</a></li>
          <li className="breadcrumb__sep">›</li>
          <li className="breadcrumb__item"><a href="/residence-temporaire">Résidence temporaire</a></li>
          <li className="breadcrumb__sep">›</li>
          <li className="breadcrumb__item breadcrumb__item--active">Visa de visiteurs / AVE</li>
        </ol>
      </div>

      {/* ── PAGE HEADER ── */}
      <header className="page-header">
        <div className="page-header__left">
          <span className="page-header__tag fade-up" data-delay="0">Résidence temporaire</span>
          <h1 className="page-header__title fade-up" data-delay="1">
            Visa de visiteurs<br />& <em>AVE</em>
          </h1>
          <p className="page-header__desc fade-up" data-delay="2">
            Planifiez votre séjour au Canada en toute sérénité. Que vous ayez besoin d'un visa de visiteur ou d'une autorisation de voyage électronique, A2K vous guide à travers chaque étape.
          </p>
        </div>
        <div className="page-header__right fade-up" data-delay="3">
          <div className="info-pill">
            <div className="info-pill__icon">⏱</div>
            <div>
              <div className="info-pill__label">Délai de traitement</div>
              <div className="info-pill__value">14 – 30 jours</div>
            </div>
          </div>
          <div className="info-pill">
            <div className="info-pill__icon">💰</div>
            <div>
              <div className="info-pill__label">Frais gouvernementaux</div>
              <div className="info-pill__value">100 CAD (TRV) · 7 CAD (AVE)</div>
            </div>
          </div>
          <div className="info-pill">
            <div className="info-pill__icon">📅</div>
            <div>
              <div className="info-pill__label">Durée maximale du séjour</div>
              <div className="info-pill__value">6 mois</div>
            </div>
          </div>
        </div>
      </header>

      <div className="section-divider" />

      {/* ── MAIN CONTENT ── */}
      <div className="page-content">

        {/* LEFT */}
        <div className="content-main">

          {/* Types de visa */}
          <div className="content-section">
            <span className="content-section__tag">Types de visa</span>
            <h2 className="content-section__title">Quel document vous faut-il?</h2>
            <p className="content-section__body">
              Le type de document dépend de votre nationalité et de votre mode de transport pour entrer au Canada. Consultez les deux options ci-dessous pour déterminer lequel s'applique à votre situation.
            </p>
            <div className="visa-types">
              {VISA_TYPES.map((v, i) => (
                <div
                  key={v.num}
                  className={`visa-type-card${openCard === i ? " visa-type-card--open" : ""}`}
                >
                  <div className="visa-type-card__header" onClick={() => toggleCard(i)}>
                    <div className="visa-type-card__header-left">
                      <span className="visa-type-card__num">{v.num}</span>
                      <span className="visa-type-card__name">{v.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className={`visa-type-card__badge visa-type-card__badge--${v.badgeStyle}`}>
                        {v.badge}
                      </span>
                      <span className="visa-type-card__arrow">▾</span>
                    </div>
                  </div>
                  <div className="visa-type-card__body">
                    <p className="visa-type-card__body-text">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents requis */}
          <div className="content-section">
            <span className="content-section__tag">Documents requis</span>
            <h2 className="content-section__title">Ce que vous devez préparer</h2>
            <p className="content-section__body">
              La solidité de votre dossier est le facteur clé d'une approbation. Voici les documents généralement demandés — notre équipe vous aide à les réunir et à les présenter de façon optimale.
            </p>
            <ul className="requirements-list">
              {REQUIREMENTS.map((r, i) => (
                <li key={i} className="requirements-list__item">
                  <div className="requirements-list__dot" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Processus */}
          <div className="content-section">
            <span className="content-section__tag">Processus</span>
            <h2 className="content-section__title">Étapes de votre demande</h2>
            <p className="content-section__body">
              De l'évaluation initiale à la décision finale, voici le déroulement type d'une demande de visa de visiteur accompagnée par A2K.
            </p>
            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div key={i} className="timeline__item">
                  <div className="timeline__left">
                    <div className="timeline__circle">{i + 1}</div>
                    <div className="timeline__line" />
                  </div>
                  <div className="timeline__content">
                    <div className="timeline__step">{t.step}</div>
                    <div className="timeline__detail">{t.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="content-sidebar">

          {/* Consultation card */}
          <div className="sidebar-card sidebar-card--dark">
            <div className="sidebar-card__title">Prêt à démarrer votre demande?</div>
            <div className="sidebar-card__desc">
              Nos consultants règlementés analysent votre dossier et maximisent vos chances d'approbation.
            </div>
            <div className="sidebar-card__price">25 $</div>
            <ul className="sidebar-card__list">
              {["Rapport d'admissibilité en 48h", "Analyse complète de votre profil", "Recommandations personnalisées"].map((item) => (
                <li key={item} className="sidebar-card__list-item">
                  <div className="sidebar-card__check">✓</div>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/consultation/rapport" className="btn--gold-full">
              Obtenir mon rapport →
            </a>
            <a href="/consultation/rencontre" className="btn--ghost-full">
              Ou rencontrer un consultant (69 $)
            </a>
          </div>

          {/* FAQ card */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Questions fréquentes</div>
            <div className="sidebar-card__divider" />
            {[
              { q: "Puis-je travailler avec un visa de visiteur?", a: "Non. Le visa de visiteur n'autorise pas le travail au Canada." },
              { q: "Mon visa sera-t-il automatiquement de 6 mois?", a: "La durée est déterminée par l'agent à l'entrée, généralement 6 mois." },
              { q: "Puis-je prolonger mon séjour?", a: "Oui, une prolongation doit être demandée avant l'expiration de votre statut." },
            ].map((faq, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A18" }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{faq.a}</div>
                {i < 2 && <div className="sidebar-card__divider" style={{ marginTop: 6 }} />}
              </div>
            ))}
          </div>

          {/* CTA secondary */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Autres types de résidence temporaire</div>
            <div className="sidebar-card__divider" />
            {[
              { label: "Super Visa", href: "/super-visa" },
              { label: "Visa professionnel", href: "/visa-professionnel" },
              { label: "Permis d'étude", href: "/permis-etude" },
              { label: "Permis de travail", href: "/permis-travail" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: "#444",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#C8A96E"}
                onMouseLeave={e => e.currentTarget.style.color = "#444"}
              >
                {link.label}
                <span style={{ fontSize: 11, color: "#ccc" }}>→</span>
              </a>
            ))}
          </div>

        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <span className="logo__a">A2K</span>
            <span className="logo__sub">IMMIGRATION</span>
          </div>
          <p className="footer__tagline">Consultant règlementé en immigration · Canada</p>
          <p className="footer__site">www.a2kimmigration-canada.ca</p>
        </div>
      </footer>

    </div>
  );
}