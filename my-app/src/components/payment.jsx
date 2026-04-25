import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const getStripe = async () => {
    const res = await fetch("http://localhost:5252/config");
    const { publishableKey } = await res.json();
    return loadStripe(publishableKey);
  };
  
const stripePromise = getStripe();

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // ✅ RULE #2: call elements.submit() first, then confirmPayment
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) setMessage(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={loading || !stripe}>
        {loading ? "Processing..." : "Pay now"}
      </button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}

// ✅ RULE #3: Elements wraps CheckoutForm and receives clientSecret via options
export default function Payment({ clientSecret }) {
  if (!clientSecret) return <div>Loading payment...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}