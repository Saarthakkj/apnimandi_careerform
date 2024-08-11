import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import "./CareersForm.css";

// Define the Zod schema
const FormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

function CareersForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    url: "",
  });

  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSubmitted(false);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = FormSchema.safeParse(formData);

    if (!response.success) {
      setError(response.error.errors);
    } else {
      console.log("Form is submitted!");
      setError(null);
      setSubmitted(true);

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("url", formData.url);
      if (resume) {
        formDataToSend.append("resume", resume);
      }
      console.log(" this is the form data : ");
      console.log("firstname :" , formData.firstName);
      console.log("lastname :" , formData.lastName);
      console.log("phoneNumber :" , formData.phoneNumber);
      console.log("email :" , formData.email);
      console.log("url :" , formData.url);
      try {
        await axios.post("https://script.google.com/macros/s/AKfycbzzZFQS9KgFZi-BdtlaDVuOMI1sd1ndWXMsFJhmeJgg6Skk_rtcxXF2Iml3RUhHwUP4/exec", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Data sent to the server");
      } catch (error) {
        console.error("Error sending data to the server", error);
      }
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h3>Form is submitted!</h3>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h3>All fields are mandatory!</h3>
        <ul>
          {error &&
            error.map((err, index) => <li key={index}>{err.message}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div className="form-container inter-font">
      <h1>Submit Your Application</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="entry">
          <label>Position Title</label>
          <input
            className="input-color"
            type="text"
            value="Software Engineer 2"
            disabled
            style={{ display: "inline-block" }}
          />
        </div>
        <div className="entry">
          <label>Resume *</label>
          <a
            href="#"
            className="upload-link"
            onClick={() => document.getElementById("resumeUpload").click()}
          >
            Please upload resume/CV
          </a>
          <input
            type="file"
            id="resumeUpload"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>
        <div className="entry">
          <label>First Name *</label>
          <input
            type="text"
            placeholder="First Name"
            required
            className="input-color"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="entry">
          <label>Last Name *</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            className="input-color"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="entry">
          <label>Phone Number *</label>
          <div className="phone-input-container">
            <select className="country-code">
              <option value="+91">IN +91</option>
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              className="phone-number-input"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="entry">
          <label>Email *</label>
          <input
            type="email"
            placeholder="Email"
            required
            className="input-color"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="entry">
          <label>Additional Documents</label>
          <a
            href="#"
            className="upload-link"
            onClick={() => document.getElementById("documentUpload").click()}
          >
            Upload document(s)
          </a>
          <input type="file" id="documentUpload" className="file-input" />
        </div>
        <div className="entry">
          <label>URL (LinkedIn, Github, Portfolio):</label>
          <input
            type="text"
            placeholder="URL"
            className="input-color"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
      {successMessage()}
      {errorMessage()}
    </div>
  );
}

export default CareersForm;
