import React, { useState } from 'react';
import { z } from 'zod';
import "./CareersForm.css";
import axios from 'axios';

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
    position_title: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    url: "",
    resume : null,
    additional_documents : null,
  });

  const [resume, setResume] = useState(null);
  const [additional_documents, setAdditional_documents] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  // const [resumeFileName, setResumeFileName] = useState('Please upload resume/CV');


  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSubmitted(false);
  };

  const handleFileChange1 = (e) => {
    setResume(e.target.files[0]);
    const file = e.target.files[0]; 
    setFormData({
      ...formData,
      resume: file,
    });
    console.log("file anme is : ", file.name);
    document.getElementById("upload-link1").innerHTML = file.name;
  };

  const handleFileChange2 = (e) => {
    setAdditional_documents(e.target.files[0]);
    const file = e.target.files[0];
    setFormData({
      ...formData,
      additional_documents: file,
    });
    console.log("file anme is : ", file.name);
    document.getElementById("upload-link2").innerHTML = file.name;
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    // console.log("----------------------", e.target);
    setFormData({
      ...formData,
      position_title: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = FormSchema.safeParse(formData);

    if (!response.success) {
      setError(response.error.errors);
    } else {
      console.log("Form is submitted!");
      setError(null);
      setSubmitted(true);
      console.log(" this is the form data : ");
      console.log("position_title :", formData.position_title);
      console.log("firstname :", formData.firstName);
      console.log("lastname :", formData.lastName);
      console.log("phoneNumber :", formData.phoneNumber);
      console.log("email :", formData.email);
      console.log("url :", formData.url);
      console.log("form data :", formData);
      const response = await axios.post("http://localhost:3001/addToSpreadsheet", formData, {
        headers: {
          'content-Type': 'multipart/form-data',
        },
      });
      console.log("response ", response);
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
      >upload-link1
        <h3>All fields are mandatory!</h3>
        <ul>
          {error &&
            error.map((err, index) => <li key={index}>{err.message}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div className="form-container">
      <h1>Submit Your Application</h1>
      <form className="form-group " onSubmit={handleSubmit}>
        <div className="entry">
          <h5>Position Title</h5>
          <select className="job-roles" value = {formData.position_title} onChange={handleSelectChange}>
            <option value="" disabled>Select a position</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Operations Manager">Operations Manager</option>
            <option value="Business Developer">Business Developer</option>
            <option value="Content Management">Content Management</option>
          </select>
        </div>
        <div className="entry">
          <h5>Resume *</h5>
          <a
            href="#"
            className="upload-link"
            id = 'upload-link1'
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("resumeUpload").click();

            }}
          >
            Please upload resume/CV
          </a>
          <input
            type="file"
            id="resumeUpload"
            className="file-input"
            onChange={handleFileChange1}
          />
        </div>
        <div className="entry">
          <h5>First Name *</h5>
          <input
            type="text"
            placeholder="First Name"
            required
            className="input-color space"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="entry">
          <h5>Last Name *</h5>
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
          <h5>Phone Number *</h5>
          <div className="phone-input-container">
            <select className="country-code">
              <option value="+91">IN +91</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
              <option value="+61">AU +61</option>
              <option value="+81">JP +81</option>
              <option value="+49">DE +49</option>
              <option value="+33">FR +33</option>
              <option value="+39">IT +39</option>
              <option value="+86">CN +86</option>
              <option value="+7">RU +7</option>
              <option value="+55">BR +55</option>
              <option value="+27">ZA +27</option>
              <option value="+34">ES +34</option>
              <option value="+82">KR +82</option>
              <option value="+31">NL +31</option>
              <option value="+47">NO +47</option>
              <option value="+46">SE +46</option>
              <option value="+41">CH +41</option>
              <option value="+52">MX +52</option>
              <option value="+64">NZ +64</option>
              <option value="+65">SG +65</option>
              <option value="+60">MY +60</option>
              <option value="+66">TH +66</option>
              <option value="+62">ID +62</option>
              <option value="+63">PH +63</option>
              <option value="+90">TR +90</option>
              <option value="+48">PL +48</option>
              <option value="+30">GR +30</option>
              <option value="+32">BE +32</option>
              <option value="+45">DK +45</option>
              <option value="+353">IE +353</option>
              <option value="+351">PT +351</option>
              <option value="+358">FI +358</option>
              <option value="+420">CZ +420</option>
              <option value="+421">SK +421</option>
              <option value="+36">HU +36</option>
              <option value="+40">RO +40</option>
              <option value="+386">SI +386</option>
              <option value="+372">EE +372</option>
              <option value="+371">LV +371</option>
              <option value="+370">LT +370</option>
              <option value="+375">BY +375</option>
              <option value="+380">UA +380</option>
              <option value="+994">AZ +994</option>
              <option value="+374">AM +374</option>
              <option value="+995">GE +995</option>
              <option value="+84">VN +84</option>
              <option value="+880">BD +880</option>
              <option value="+92">PK +92</option>
              <option value="+98">IR +98</option>
              <option value="+964">IQ +964</option>
              <option value="+962">JO +962</option>
              <option value="+961">LB +961</option>
              <option value="+965">KW +965</option>
              <option value="+968">OM +968</option>
              <option value="+974">QA +974</option>
              <option value="+966">SA +966</option>
              <option value="+971">AE +971</option>
              <option value="+973">BH +973</option>
              <option value="+972">IL +972</option>
              <option value="+20">EG +20</option>
              <option value="+212">MA +212</option>
              <option value="+213">DZ +213</option>
              <option value="+216">TN +216</option>
              <option value="+218">LY +218</option>
              <option value="+254">KE +254</option>
              <option value="+255">TZ +255</option>
              <option value="+256">UG +256</option>
              <option value="+234">NG +234</option>
              <option value="+233">GH +233</option>
              <option value="+221">SN +221</option>
              <option value="+225">CI +225</option>
              <option value="+243">CD +243</option>
              <option value="+260">ZM +260</option>
              <option value="+263">ZW +263</option>
              <option value="+258">MZ +258</option>
              <option value="+267">BW +267</option>
              <option value="+264">NA +264</option>
              <option value="+265">MW +265</option>
              <option value="+256">UG +256</option>
              <option value="+250">RW +250</option>
              <option value="+252">SO +252</option>
              <option value="+253">DJ +253</option>
              <option value="+254">KE +254</option>
              <option value="+255">TZ +255</option>
              <option value="+256">UG +256</option>
              <option value="+257">BI +257</option>
              <option value="+258">MZ +258</option>
              <option value="+260">ZM +260</option>
              <option value="+261">MG +261</option>
              <option value="+262">RE +262</option>
              <option value="+263">ZW +263</option>
              <option value="+264">NA +264</option>
              <option value="+265">MW +265</option>
              <option value="+266">LS +266</option>
              <option value="+267">BW +267</option>
              <option value="+268">SZ +268</option>
              <option value="+269">KM +269</option>
              <option value="+27">ZA +27</option>
              <option value="+290">SH +290</option>
              <option value="+291">ER +291</option>
              <option value="+297">AW +297</option>
              <option value="+298">FO +298</option>
              <option value="+299">GL +299</option>
              <option value="+350">GI +350</option>
              <option value="+351">PT +351</option>
              <option value="+352">LU +352</option>
              <option value="+353">IE +353</option>
              <option value="+354">IS +354</option>
              <option value="+355">AL +355</option>
              <option value="+356">MT +356</option>
              <option value="+357">CY +357</option>
              <option value="+358">FI +358</option>
              <option value="+359">BG +359</option>
              <option value="+36">HU +36</option>
              <option value="+370">LT +370</option>
              <option value="+371">LV +371</option>
              <option value="+372">EE +372</option>
              <option value="+373">MD +373</option>
              <option value="+374">AM +374</option>
              <option value="+375">BY +375</option>
              <option value="+376">AD +376</option>
              <option value="+377">MC +377</option>
              <option value="+378">SM +378</option>
              <option value="+379">VA +379</option>
              <option value="+380">UA +380</option>
              <option value="+381">RS +381</option>
              <option value="+382">ME +382</option>
              <option value="+383">XK +383</option>
              <option value="+385">HR +385</option>
              <option value="+386">SI +386</option>
              <option value="+387">BA +387</option>
              <option value="+389">MK +389</option>
              <option value="+39">IT +39</option>
              <option value="+40">RO +40</option>
              <option value="+41">CH +41</option>
              <option value="+420">CZ +420</option>
              <option value="+421">SK +421</option>
              <option value="+423">LI +423</option>
              <option value="+43">AT +43</option>
              <option value="+44">GB +44</option>
              <option value="+45">DK +45</option>
              <option value="+46">SE +46</option>
              <option value="+47">NO +47</option>
              <option value="+48">PL +48</option>
              <option value="+49">DE +49</option>
              <option value="+500">FK +500</option>
              <option value="+501">BZ +501</option>
              <option value="+502">GT +502</option>
              <option value="+503">SV +503</option>
              <option value="+504">HN +504</option>
              <option value="+505">NI +505</option>
              <option value="+506">CR +506</option>
              <option value="+507">PA +507</option>
              <option value="+508">PM +508</option>
              <option value="+509">HT +509</option>
              <option value="+51">PE +51</option>
              <option value="+52">MX +52</option>
              <option value="+53">CU +53</option>
              <option value="+54">AR +54</option>
              <option value="+55">BR +55</option>
              <option value="+56">CL +56</option>
              <option value="+57">CO +57</option>
              <option value="+58">VE +58</option>
              <option value="+590">GP +590</option>
              <option value="+591">BO +591</option>
              <option value="+592">GY +592</option>
              <option value="+593">EC +593</option>
              <option value="+594">GF +594</option>
              <option value="+595">PY +595</option>
              <option value="+596">MQ +596</option>
              <option value="+597">SR +597</option>
              <option value="+598">UY +598</option>
              <option value="+599">CW +599</option>
              <option value="+60">MY +60</option>
              <option value="+61">AU +61</option>
              <option value="+62">ID +62</option>
              <option value="+63">PH +63</option>
              <option value="+64">NZ +64</option>
              <option value="+65">SG +65</option>
              <option value="+66">TH +66</option>
              <option value="+670">TL +670</option>
              <option value="+672">NF +672</option>
              <option value="+673">BN +673</option>
              <option value="+674">NR +674</option>
              <option value="+675">PG +675</option>
              <option value="+676">TO +676</option>
              <option value="+677">SB +677</option>
              <option value="+678">VU +678</option>
              <option value="+679">FJ +679</option>
              <option value="+680">PW +680</option>
              <option value="+681">WF +681</option>
              <option value="+682">CK +682</option>
              <option value="+683">NU +683</option>
              <option value="+685">WS +685</option>
              <option value="+686">KI +686</option>
              <option value="+687">NC +687</option>
              <option value="+688">TV +688</option>
              <option value="+689">PF +689</option>
              <option value="+690">TK +690</option>
              <option value="+691">FM +691</option>
              <option value="+692">MH +692</option>
              <option value="+7">RU +7</option>
              <option value="+81">JP +81</option>
              <option value="+82">KR +82</option>
              <option value="+84">VN +84</option>
              <option value="+850">KP +850</option>
              <option value="+852">HK +852</option>
              <option value="+853">MO +853</option>
              <option value="+855">KH +855</option>
              <option value="+856">LA +856</option>
              <option value="+86">CN +86</option>
              <option value="+880">BD +880</option>
              <option value="+886">TW +886</option>
              <option value="+90">TR +90</option>
              <option value="+91">IN +91</option>
              <option value="+92">PK +92</option>
              <option value="+93">AF +93</option>
              <option value="+94">LK +94</option>
              <option value="+95">MM +95</option>
              <option value="+960">MV +960</option>
              <option value="+961">LB +961</option>
              <option value="+962">JO +962</option>
              <option value="+963">SY +963</option>
              <option value="+964">IQ +964</option>
              <option value="+965">KW +965</option>
              <option value="+966">SA +966</option>
              <option value="+967">YE +967</option>
              <option value="+968">OM +968</option>
              <option value="+970">PS +970</option>
              <option value="+971">AE +971</option>
              <option value="+972">IL +972</option>
              <option value="+973">BH +973</option>
              <option value="+974">QA +974</option>
              <option value="+975">BT +975</option>
              <option value="+976">MN +976</option>
              <option value="+977">NP +977</option>
              <option value="+98">IR +98</option>
              <option value="+992">TJ +992</option>
              <option value="+993">TM +993</option>
              <option value="+994">AZ +994</option>
              <option value="+995">GE +995</option>
              <option value="+996">KG +996</option>
              <option value="+998">UZ +998</option>
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
          <h5>Email *</h5>
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
          <h5>Additional Documents</h5>
          <a
            href="#"
            className="upload-link"
            id = "upload-link2"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("documentUpload").click();
            }}
          >
            Upload document(s)
          </a>
          <input type="file" id="documentUpload" className="file-input" onChange={handleFileChange2}/>
        </div>
        <div className="entry">
          <h5>URL (LinkedIn, Github, Portfolio):</h5>
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
