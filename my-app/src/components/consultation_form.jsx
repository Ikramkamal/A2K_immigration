// import React, { useState } from 'react';
// import '../css/consultationForm.css';
// import { InlineWidget } from "react-calendly";

// const ConsultationForm = () => {

//   return (

//     <InlineWidget url="https://calendly.com/a2kimmigration/consultation-60min" />
//   );
// };

// export default ConsultationForm;


import React from 'react';
import '../css/consultationForm.css';

const ConsultationForm = () => {
  return (
    <iframe
      src="https://cal.com/atik-kamal-hwzelp/30min?theme=light"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        overflow: 'hidden',
      }}
      title="Book a Consultation"
    />
  );
};

export default ConsultationForm;