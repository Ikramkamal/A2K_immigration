import React, { useState } from 'react';
import '../css/consultationForm.css';
import { InlineWidget } from "react-calendly";

const ConsultationForm = () => {

  return (

    <InlineWidget url="https://calendly.com/a2kimmigration/consultation-60min" />
  );
};

export default ConsultationForm;