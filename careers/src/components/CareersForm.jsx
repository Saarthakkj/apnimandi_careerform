import React, { useState } from "react";
import "./CareersForm.css";

function CareersForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container inter-font">
      <h1>Submit Your Application</h1>
      <form className="form-group">
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
          <input type="file" id="resumeUpload" className="file-input" />
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
      </form>
      <div className="button-container">
        <button type="button" className="cancel-button">Cancel</button>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default CareersForm;