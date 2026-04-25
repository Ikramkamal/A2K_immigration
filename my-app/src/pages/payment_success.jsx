import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PaymentSuccess() {
  return (
    <div className="page-container">
      <Header />

      <main className="content" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{
          textAlign: "center",
          maxWidth: "520px",
          padding: "3rem 2rem",
        }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.75rem" }}>
            Payment confirmed!
          </h1>
          <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "2rem" }}>
            Thank you for your request. Your immigration report is being prepared and will be delivered to your email within <strong>48 hours</strong>.
          </p>
          <a href="/" style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
          }}>
            Back to home
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}