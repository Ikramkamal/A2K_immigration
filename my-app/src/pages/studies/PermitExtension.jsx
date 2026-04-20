import { useState, useEffect } from "react";


const NAV_LINKS = [
  { label: "Résidence temporaire", href: "/residence-temporaire" },
  { label: "Études", href: "#" },
  { label: "Travail", href: "#" },
  { label: "Résidence permanente", href: "#" },
  { label: "Consultation", href: "#", cta: true },
];

export default function PermitExtension() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="permit-extension">

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

      {/* ── EMPTY PAGE CONTENT ── */}
      <div style={{ minHeight: "80vh" }} />

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <span className="logo__a">A2K</span>
            <span className="logo__sub">IMMIGRATION</span>
          </div>
          <p className="footer__tagline">
            Consultant règlementé en immigration · Canada
          </p>
          <p className="footer__site">
            www.a2kimmigration-canada.ca
          </p>
        </div>
      </footer>

    </div>
  );
}