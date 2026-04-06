import React, { useState } from 'react';
import '../css/consultationForm.css';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    immigrationCategory: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    familySituation: '',
    numberOfChildren: 0,
    children: [],
    languageTest: false,
    cv: null,
    languageTestDoc: null,
    diplomas: null,
    appointmentDate: '',
    appointmentTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const immigrationCategories = [
    'Sélectionner une catégorie',
    'Programme des travailleurs qualifiés',
    'Programme de l\'expérience québécoise',
    'Programme de parrainage familial',
    'Réfugié et personnes à protéger',
    'Entrepreneur immigrant',
    'Autre'
  ];

  const familySituations = [
    'Sélectionner',
    'Célibataire',
    'Marié(e)',
    'Union libre',
    'Divorcé(e)',
    'Veuf(ve)'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));
    } else {
      alert('Veuillez sélectionner un fichier PDF valide');
    }
  };

  const handleChildrenCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      numberOfChildren: count,
      children: Array(count).fill(null).map((_, i) => 
        prev.children[i] || { name: '', dateOfBirth: '' }
      )
    }));
  };

  const handleChildChange = (index, field, value) => {
    setFormData(prev => {
      const newChildren = [...prev.children];
      newChildren[index] = { ...newChildren[index], [field]: value };
      return { ...prev, children: newChildren };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.immigrationCategory || formData.immigrationCategory === 'Sélectionner une catégorie') {
      newErrors.immigrationCategory = 'Veuillez sélectionner une catégorie';
    }
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
    if (!formData.familySituation || formData.familySituation === 'Sélectionner') {
      newErrors.familySituation = 'La situation familiale est requise';
    }
    if (!formData.cv) newErrors.cv = 'Le CV est requis';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'La date est requise';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'L\'heure est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Formulaire soumis:', formData);
      setSubmitted(true);
      // Intégration avec votre système de paiement
      // handlePayment(formData);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <h1>Rencontrer un consultant réglementé en immigration</h1>
        <p className="duration">1 heure</p>
        <p className="price">Coût: 69$</p>
        <button className="start-btn">Commencer votre demande</button>
      </div>

      <form onSubmit={handleSubmit} className="consultation-form">
        {/* Section 1: Catégorie d'immigration */}
        <div className="form-section">
          <h2>Catégorie d'immigration souhaitée</h2>
          <select
            name="immigrationCategory"
            value={formData.immigrationCategory}
            onChange={handleInputChange}
            className={`form-select ${errors.immigrationCategory ? 'error' : ''}`}
          >
            {immigrationCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.immigrationCategory && <span className="error-text">{errors.immigrationCategory}</span>}
        </div>

        {/* Section 2: Informations Personnelles */}
        <div className="form-section">
          <h2>Informations Personnelles</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Courriel *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date de naissance *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>
            <div className="form-group">
              <label>Situation familiale *</label>
              <select
                name="familySituation"
                value={formData.familySituation}
                onChange={handleInputChange}
                className={errors.familySituation ? 'error' : ''}
              >
                {familySituations.map(sit => (
                  <option key={sit} value={sit}>{sit}</option>
                ))}
              </select>
              {errors.familySituation && <span className="error-text">{errors.familySituation}</span>}
            </div>
          </div>
        </div>

        {/* Section 3: Informations Familiales */}
        <div className="form-section">
          <h2>Informations Familiales</h2>
          <div className="form-group">
            <label>Nombre d'enfants</label>
            <select
              value={formData.numberOfChildren}
              onChange={handleChildrenCountChange}
              className="form-select"
            >
              {[0, 1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {formData.children.map((child, index) => (
            <div key={index} className="children-group">
              <h3>Enfant {index + 1}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nom de l'enfant</label>
                  <input
                    type="text"
                    value={child.name || ''}
                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Date de naissance</label>
                  <input
                    type="date"
                    value={child.dateOfBirth || ''}
                    onChange={(e) => handleChildChange(index, 'dateOfBirth', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Test de Langue */}
        <div className="form-section">
          <h2>Test de Langue</h2>
          <p>Avez-vous passé un test de langue durant les 24 derniers mois?</p>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="languageTest"
                checked={formData.languageTest}
                onChange={handleInputChange}
              />
              Oui
            </label>
          </div>
        </div>

        {/* Section 5: Téléchargements */}
        <div className="form-section">
          <h2>Documents Requis</h2>
          <div className="form-group">
            <label>Télécharger votre CV (format PDF) *</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, 'cv')}
              className={`file-input ${errors.cv ? 'error' : ''}`}
            />
            {formData.cv && <p className="file-name">✓ {formData.cv.name}</p>}
            {errors.cv && <span className="error-text">{errors.cv}</span>}
          </div>

          {formData.languageTest && (
            <div className="form-group">
              <label>Télécharger votre test de langue (format PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'languageTestDoc')}
                className="file-input"
              />
              {formData.languageTestDoc && <p className="file-name">✓ {formData.languageTestDoc.name}</p>}
            </div>
          )}

          <div className="form-group">
            <label>Télécharger vos diplômes (format PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, 'diplomas')}
              className="file-input"
            />
            {formData.diplomas && <p className="file-name">✓ {formData.diplomas.name}</p>}
          </div>
        </div>

        {/* Section 6: Planification */}
        <div className="form-section">
          <h2>Sélectionner la Date et l'Heure de Rencontre</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className={errors.appointmentDate ? 'error' : ''}
              />
              {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
            </div>
            <div className="form-group">
              <label>Heure *</label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                className={errors.appointmentTime ? 'error' : ''}
              />
              {errors.appointmentTime && <span className="error-text">{errors.appointmentTime}</span>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-section submit-section">
          <button type="submit" className="payment-btn">
            Passer au paiement pour confirmer votre rencontre de consultation
          </button>
        </div>

        {submitted && (
          <div className="success-message">
            ✓ Votre formulaire a été soumis avec succès! Vous serez redirigé vers le paiement.
          </div>
        )}
      </form>
    </div>
  );
};

export default ConsultationForm;