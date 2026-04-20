import { useState, useEffect } from "react";
import "../css/Header.css"
import { Link } from "react-router-dom";
const NAV_LINKS = [
  {
    label: "Résidence temporaire",
    children: [
      { label: "Visite temporaire", href: "#" },
      { label: "Visa de visiteurs ou AVE", href: "/visitor-visa" },
      { label: "Super visa", href: "/super-visa" },
      { label: "Visa professionnel", href: "/professional-visa" },
    ],
  },
  {
    label: "Études",
    children: [
      { label: "Permis d’étude", href: "/study-permit" },
      { label: "Prolongation de permis d’étude", href: "/permit-extension" },
      { label: "Permis de travail post diplôme", href: "/postgrad-work-permit" },
    ],
  },
  {
    label: "Travail",
    children: [
      { label: "Permis de travail lié à un employeur", href: "/emp-linked-permit" },
      { label: "Permis de travail ouvert", href: "/open-work-permit" },
      { label: "Investisseur", href: "#" },
      { label: "Entrepreneur", href: "#" },
      { label: "Travailleur autonome", href: "#" },
    ],
  },
  {
    label: "Résidence permanente",
    children: [
      { label: "Immigration au Quebec", href: "#" },
      { label: "Entrée express", href: "#" },
      { label: "Parrainage familial", href: "#" },
      { label: "Parrainage des conjoints, conjointes et enfants", href: "#" },
      { label: "Parrainage des parents", href: "#" },
      { label: "Parrainage d’autres membres de la famille", href: "#" },
    ],
  },
  { label: "Consultation", href: "/consultation", cta: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <span className="logo__a">A2K</span>
          <span className="logo__sub">IMMIGRATION</span>
        </Link>

       
        <div className="nav__links">
        {NAV_LINKS.map((l) => (
          <div className="nav__item" key={l.label}>
            
            {/* Parent */}
            {l.children ? (
              <span className="nav__link nav__link--parent">
                {l.label}
              </span>
            ) : (
              <Link to={l.href} className={l.cta ? "nav__cta" : "nav__link"}>
                {l.label}
              </Link>
            )}

            {/* Dropdown */}
            {l.children && (
              <div className="dropdown">
                {l.children.map((sub, i) => (
                  <Link key={i} to={sub.href} className="dropdown__item">
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
            
          </div>
        ))}
      </div>
      </div>
    </nav>
  );
}