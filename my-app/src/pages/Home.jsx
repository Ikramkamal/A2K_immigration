import { useState, useEffect, useRef } from "react";
import "../css/Home.css";

const NAV_LINKS = [
  { label: "Résidence temporaire", href: "/residence-temporaire" },
  { label: "Études", href: "#" },
  { label: "Travail", href: "#" },
  { label: "Résidence permanente", href: "/residence-temporaire" },
  { label: "Consultation", href: "#", cta: true },
];

const SERVICES = [
  {
    code: "01",
    title: "Résidence temporaire",
    desc: "Visa visiteurs, AVE, super visa, visa professionnel — entrée rapide au Canada.",
    color: "#C8A96E",
  },
  {
    code: "02",
    title: "Études au Canada",
    desc: "Permis d'étude, prolongation et permis post-diplôme pour votre avenir académique.",
    color: "#8BAF9A",
  },
  {
    code: "03",
    title: "Travail au Canada",
    desc: "Permis lié à un employeur ou permis ouvert selon votre situation professionnelle.",
    color: "#7A9BB5",
  },
  {
    code: "04",
    title: "Résidence permanente",
    desc: "Entrée Express, immigration au Québec, parrainage familial et voie investisseur.",
    color: "#B08EA0",
  },
];

const STEPS = [
  { num: "1", label: "Consultation", detail: "Rencontrez un expert règlementé" },
  { num: "2", label: "Évaluation", detail: "Rapport d'admissibilité en 48h" },
  { num: "3", label: "Dossier", detail: "Préparation complète de votre demande" },
  { num: "4", label: "Suivi", detail: "Accompagnement jusqu'à l'approbation" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesRef, servicesVisible] = useInView();
  const [stepsRef, stepsVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home">

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a href="/" className="nav__logo">
            <span className="logo__a">A2K</span>
            <span className="logo__sub">IMMIGRATION</span>
          </a>
          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={l.cta ? "nav__cta" : "nav__link"}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__grain" />
          <div className="hero__accent--1" />
          <div className="hero__accent--2" />
          <div className="hero__grid" />
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow fade-up" data-delay="0">
            Consultant règlementé en immigration
          </p>
          <h1 className="hero__title fade-up" data-delay="1">
            Votre avenir<br />
            <em>au Canada</em><br />
            commence ici.
          </h1>
          <p className="hero__subtitle fade-up" data-delay="2">
            De la résidence temporaire à la résidence permanente,<br />
            A2K vous accompagne à chaque étape de votre parcours migratoire.
          </p>
          <div className="hero__actions fade-up" data-delay="3">
            <a href="#" className="btn--primary">Commencer ma démarche</a>
            <a href="#" className="btn--ghost">Évaluation gratuite →</a>
          </div>
        </div>

        <div className="hero__stats fade-up" data-delay="4">
          <div className="stat__item">
            <span className="stat__num">98%</span>
            <span className="stat__label">taux d'approbation</span>
          </div>
          <div className="stat__divider" />
          <div className="stat__item">
            <span className="stat__num">48h</span>
            <span className="stat__label">rapport d'admissibilité</span>
          </div>
          <div className="stat__divider" />
          <div className="stat__item">
            <span className="stat__num">+500</span>
            <span className="stat__label">dossiers traités</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" ref={servicesRef}>
        <div className="section__inner">
          <div className="section__header">
            <span className="section__tag">Nos services</span>
            <h2 className="section__title">
              Toutes les voies<br />d'immigration couvertes
            </h2>
          </div>
          <div className="services__grid">
            {SERVICES.map((s, i) => (
              <div
                key={s.code}
                className="service-card"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? "translateY(0)" : "translateY(32px)",
                }}
              >
                <div className="service-card__accent" style={{ background: s.color }} />
                <span className="service-card__code">{s.code}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <a href="#" className="service-card__link">En savoir plus →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION BANNER ── */}
      <section className="consult-banner">
        <div className="consult-banner__inner">
          <div className="consult-banner__left">
            <span className="consult-banner__tag">Consultation avec un spécialiste</span>
            <h2 className="consult-banner__title">Deux façons de démarrer</h2>
          </div>
          <div className="consult-banner__cards">
            <div className="consult-card">
              <div className="consult-card__price">25 $</div>
              <div className="consult-card__title">Rapport d'admissibilité</div>
              <p className="consult-card__desc">
                Recevez une analyse détaillée de votre dossier en 48 heures.
              </p>
              <a href="/consultation/rapport" className="btn--dark">Commencer →</a>
            </div>
            <div className="consult-card consult-card--featured">
              <div className="consult-card__price">69 $</div>
              <div className="consult-card__title">Rencontre 1 heure</div>
              <p className="consult-card__desc">
                Rencontrez un consultant règlementé et obtenez un plan personnalisé.
              </p>
              <a href="/consultation/rencontre" className="btn--light">Réserver →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="section" ref={stepsRef}>
        <div className="section__inner">
          <div className="section__header">
            <span className="section__tag">Notre processus</span>
            <h2 className="section__title">Simple. Transparent.<br />Efficace.</h2>
          </div>
          <div className="steps__row">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className="step"
                style={{
                  transitionDelay: `${i * 120}ms`,
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? "translateY(0)" : "translateY(28px)",
                }}
              >
                <div className="step__num">{s.num}</div>
                {i < STEPS.length - 1 && <div className="step__line" />}
                <div className="step__label">{s.label}</div>
                <div className="step__detail">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        className="cta-section"
        style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="cta-section__inner">
          <h2 className="cta-section__title">
            Prêt à construire<br />votre vie au Canada?
          </h2>
          <p className="cta-section__desc">
            Commencez par une consultation — nos experts vous guident vers la meilleure voie.
          </p>
          <a href="/consultation" className="btn--primary">Prendre rendez-vous</a>
        </div>
      </section>

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