import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../css/rapportForm.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const MAX_CHILDREN = 4;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5252";

const uploadFile = async (file, folder) => {
  if (!file) return null;
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from("report_documents")
    .upload(path, file, { contentType: "application/pdf" });
  if (error) throw new Error(`Upload failed for ${folder}: ${error.message}`);
  return data.path;
};

const INITIAL_STATE = {
  immigration_category: "",
  fname: "",
  lname: "",
  email: "",
  phone: "",
  date_of_birth: "",
  marital_status: "",
  children_count: 0,
  children_birth_dates: [],
  language_test_taken: "",
};

export default function ReportForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [files, setFiles] = useState({ cv: null, language_test: null, diplomas: null });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | uploading | redirecting | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChildrenCount = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      children_count: count,
      children_birth_dates: Array(count)
        .fill("")
        .map((_, i) => prev.children_birth_dates[i] || ""),
    }));
  };

  const handleChildDate = (index, value) => {
    setFormData((prev) => {
      const dates = [...prev.children_birth_dates];
      dates[index] = value;
      return { ...prev, children_birth_dates: dates };
    });
  };

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, [key]: "PDF files only" }));
      return;
    }
    setFiles((prev) => ({ ...prev, [key]: file || null }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.immigration_category) e.immigration_category = "Required";
    if (!formData.fname.trim()) e.fname = "Required";
    if (!formData.lname.trim()) e.lname = "Required";
    if (!formData.email.trim()) e.email = "Required";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.date_of_birth) e.date_of_birth = "Required";
    if (!formData.marital_status) e.marital_status = "Required";
    if (!formData.language_test_taken) e.language_test_taken = "Required";
   // if (!files.cv) e.cv = "CV is required";
    formData.children_birth_dates.forEach((d, i) => {
      if (!d) e[`child_${i}`] = "Required";
    });
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    try {
      // Upload files to Supabase Storage in parallel
      const [cv_file_path, language_test_file_path, diplomas_file_path] =
        await Promise.all([
          uploadFile(files.cv, "cv"),
          uploadFile(files.language_test, "language-test"),
          uploadFile(files.diplomas, "diplomas"),
        ]);

      setStatus("redirecting");

      // Send form data + file paths to server
      const res = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cv_file_path,
          language_test_file_path,
          diplomas_file_path,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const isLoading = status === "uploading" || status === "redirecting";

  return (
    <div className="report-form-wrapper">
      <h1 className="form-title">Start your request</h1>
      <p className="form-subtitle">
        Fill in your information below. You will be redirected to a secure payment page to confirm your request.
      </p>

      {status === "error" && (
        <div className="form-error-banner">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Immigration Category */}
        <div className="form-group">
          <label htmlFor="immigration_category">Immigration category <span className="required">*</span></label>
          <select
            id="immigration_category"
            name="immigration_category"
            value={formData.immigration_category}
            onChange={handleChange}
            className={errors.immigration_category ? "input-error" : ""}
          >
            <option value="">Select a category</option>
            <option value="student">Student</option>
            <option value="worker">Worker</option>
            <option value="visitor">Visitor</option>
            <option value="permanent_residence">Permanent Residence</option>
            <option value="family_sponsorship">Family Sponsorship</option>
            <option value="refugee">Refugee</option>
          </select>
          {errors.immigration_category && <span className="field-error">{errors.immigration_category}</span>}
        </div>

        {/* Name row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lname">Last name <span className="required">*</span></label>
            <input
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className={errors.lname ? "input-error" : ""}
              placeholder="Doe"
            />
            {errors.lname && <span className="field-error">{errors.lname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="fname">First name <span className="required">*</span></label>
            <input
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className={errors.fname ? "input-error" : ""}
              placeholder="Jane"
            />
            {errors.fname && <span className="field-error">{errors.fname}</span>}
          </div>
        </div>

        {/* Contact row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              placeholder="jane@example.com"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone <span className="required">*</span></label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "input-error" : ""}
              placeholder="+1 514 000 0000"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
        </div>

        {/* Birth date + Marital status */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of birth <span className="required">*</span></label>
            <input
              id="date_of_birth"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={errors.date_of_birth ? "input-error" : ""}
            />
            {errors.date_of_birth && <span className="field-error">{errors.date_of_birth}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="marital_status">Marital status <span className="required">*</span></label>
            <select
              id="marital_status"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className={errors.marital_status ? "input-error" : ""}
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="common_law">Common-law</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
            {errors.marital_status && <span className="field-error">{errors.marital_status}</span>}
          </div>
        </div>

        {/* Children */}
        <div className="form-group">
          <label htmlFor="children_count">Number of children</label>
          <select
            id="children_count"
            name="children_count"
            value={formData.children_count}
            onChange={handleChildrenCount}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {formData.children_count > 0 && (
          <div className="children-dates">
            <p className="children-label">Date of birth — children</p>
            <div className="form-row children-row">
              {Array.from({ length: formData.children_count }).map((_, i) => (
                <div className="form-group" key={i}>
                  <label htmlFor={`child_${i}`}>Child {i + 1}</label>
                  <input
                    id={`child_${i}`}
                    type="date"
                    value={formData.children_birth_dates[i] || ""}
                    onChange={(e) => handleChildDate(i, e.target.value)}
                    className={errors[`child_${i}`] ? "input-error" : ""}
                  />
                  {errors[`child_${i}`] && <span className="field-error">{errors[`child_${i}`]}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language test */}
        <div className="form-group">
          <label>Have you taken a language test in the last 24 months? <span className="required">*</span></label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="language_test_taken"
                value="true"
                checked={formData.language_test_taken === "true"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="language_test_taken"
                value="false"
                checked={formData.language_test_taken === "false"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
          {errors.language_test_taken && <span className="field-error">{errors.language_test_taken}</span>}
        </div>

        {/* File uploads */}
        <div className="form-section-title">Documents <span className="format-hint">(PDF only)</span></div>

        <div className="form-group">
          <label htmlFor="cv">CV </label>
          <input
            id="cv"
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFile(e, "cv")}
            className={errors.cv ? "input-error" : ""}
          />
          {files.cv && <span className="file-name">{files.cv.name}</span>}
          {errors.cv && <span className="field-error">{errors.cv}</span>}
        </div>

        {formData.language_test_taken === "true" && (
          <div className="form-group">
            <label htmlFor="language_test">Language test results</label>
            <input
              id="language_test"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFile(e, "language_test")}
            />
            {files.language_test && <span className="file-name">{files.language_test.name}</span>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="diplomas">Diplomas / credentials</label>
          <input
            id="diplomas"
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFile(e, "diplomas")}
          />
          {files.diplomas && <span className="file-name">{files.diplomas.name}</span>}
        </div>

        {/* Submit */}
        <div className="form-footer">
          <p className="price-note">Your request will be confirmed after a secure payment of <strong>$25 CAD</strong>. Report delivered within 48 hours.</p>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {status === "uploading" && "Uploading documents..."}
            {status === "redirecting" && "Redirecting to payment..."}
            {(status === "idle" || status === "error") && "Proceed to payment →"}
          </button>
        </div>

      </form>
    </div>
  );
}