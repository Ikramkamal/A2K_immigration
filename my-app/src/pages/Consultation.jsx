import ConsultationForm from "../components/consultation_form";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Consultation(){
    return(
    
        <div>
        <div>
        <Header/>
        </div>

        <div>
        <ConsultationForm />
        </div>

        <div>
        <Footer/>
        </div>

        </div>
    )
}