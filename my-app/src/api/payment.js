
export const createPaymentIntent = async (formData) => {
    const res = await fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!res.ok) {
      throw new Error("Payment intent failed");
    }
  
    return res.json();
  };