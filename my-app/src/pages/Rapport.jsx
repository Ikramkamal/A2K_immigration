import ReportForm from "../components/report_form";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Consultation() {
  return (
    <div className="page-container">
      <Header />

      <main className="content">
        <ReportForm />
      </main>

      <Footer />
    </div>
  );
}