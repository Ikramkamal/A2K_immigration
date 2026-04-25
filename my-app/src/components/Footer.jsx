import "../css/Footer.css"
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <span className="logo__a">A2K</span>
          <span className="logo__sub">IMMIGRATION</span>
        </div>

        <div className="footer__divider" />

        <p className="footer__tagline">
          Consultant règlementé en immigration · Canada
        </p>

        <p className="footer__site">
          www.a2kimmigration-canada.ca
        </p>
      </div>
    </footer>
  );
}