import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Résidence temporaire", href: "/residence-temporaire" },
  { label: "Études", href: "#" },
  { label: "Travail", href: "#" },
  { label: "Résidence permanente", href: "/residence-temporaire" },
  { label: "Consultation", href: "#", cta: true },
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
  );
}