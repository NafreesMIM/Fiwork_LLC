// src/pages/BriefFormPage.jsx
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

const STRIPE_PAYMENT_LINKS = {
  Basic: 'https://tinyurl.com/3s95u33w',
  Standard: 'https://tinyurl.com/4euet7f3',
  Business: 'https://tinyurl.com/bddmksee',
  Premium: 'https://tinyurl.com/y4bd2ztx',
  FullBranding: 'https://tinyurl.com/ymtxc7my',
};

const BriefFormPage = () => {
  const navigate = useNavigate();
  const { package: urlPackageParam } = useParams(); // Get package from URL param

  const [formData, setFormData] = useState({
    brandName: '',
    slogan: '',
    description: '',
    preferredColors: '',
    industry: '',
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    selectedPackage: urlPackageParam || '', // Use URL param if present
  });
  const [inspirationFiles, setInspirationFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // { type: 'success'|'error', text: 'message' }

  useEffect(() => {
    if (urlPackageParam && STRIPE_PAYMENT_LINKS[urlPackageParam]) {
      setFormData(prev => ({ ...prev, selectedPackage: urlPackageParam }));
    } else if (urlPackageParam) {
      setMessage({ type: 'error', text: `Invalid package "${urlPackageParam}" selected. Please choose from the options.` });
    }
  }, [urlPackageParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInspirationFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' }); // Clear previous messages

    if (!formData.selectedPackage) {
      setMessage({ type: 'error', text: "Please select a package." });
      setIsSubmitting(false);
      return;
    }
    if (!STRIPE_PAYMENT_LINKS[formData.selectedPackage]) {
      setMessage({ type: 'error', text: `No payment link found for ${formData.selectedPackage}.` });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Upload inspiration files to Firebase Storage
      const fileDownloadUrls = [];
      const currentUserId = auth.currentUser ? auth.currentUser.uid : 'guest_anon'; // Use guest for non-logged in users
      for (const file of inspirationFiles) {
        const fileRef = ref(storage, `inspiration_files/${currentUserId}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        fileDownloadUrls.push({ name: file.name, url: downloadURL });
      }

      // 2. Save brief to Firestore
      const briefData = {
        ...formData,
        userId: auth.currentUser ? auth.currentUser.uid : null, // Link to Firebase Auth user if logged in
        inspirationFiles: fileDownloadUrls,
        status: "Pending Payment", // This status will only change manually by you later
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        paymentLinkUsed: STRIPE_PAYMENT_LINKS[formData.selectedPackage],
      };

      const docRef = await addDoc(collection(db, "clientBriefs"), briefData);
      const briefId = docRef.id;

      setMessage({ type: 'success', text: "Your brief has been submitted successfully! Redirecting to payment..." });

      // 3. Redirect to the Stripe tinyurl link
      const paymentUrl = STRIPE_PAYMENT_LINKS[formData.selectedPackage];
      if (paymentUrl) {
        window.open(paymentUrl, '_blank'); // Open in a new tab
        navigate(`/thank-you/${briefId}`); // Redirect to thank you page on your site
      } else {
        setMessage({ type: 'error', text: "Selected package has no associated payment link. Please contact us." });
      }

    } catch (error) {
      console.error("Error submitting brief:", error);
      setMessage({ type: 'error', text: `Failed to submit brief: ${error.message}. Please try again or contact us.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="brief-form-page">
      <h1>Your Vision, Our Design Journey</h1>
      <p className="page-description">
        Please fill out the form below with as much detail as possible. This helps us understand your needs
        and craft the perfect logo for your brand.
      </p>

      <form onSubmit={handleSubmit} className="brief-form">
        <div className="form-group">
          <label htmlFor="selectedPackage">Selected Package:</label>
          <select
            id="selectedPackage"
            name="selectedPackage"
            value={formData.selectedPackage}
            onChange={handleChange}
            required
            disabled={!!urlPackageParam} // Disable if pre-selected from URL
          >
            <option value="">-- Select a Package --</option>
            {Object.keys(STRIPE_PAYMENT_LINKS).map(pkg => (
              <option key={pkg} value={pkg}>{pkg}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="brandName">✨ Brand Name:</label>
          <input type="text" id="brandName" name="brandName" value={formData.brandName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="slogan">✨ Slogan (if any):</label>
          <input type="text" id="slogan" name="slogan" value={formData.slogan} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">✨ Brief Description of Design:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="preferredColors">✨ Preferred Colors (e.g., #007bff, Blue, Emerald Green):</label>
          <input type="text" id="preferredColors" name="preferredColors" value={formData.preferredColors} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="industry">✨ Industry:</label>
          <input type="text" id="industry" name="industry" value={formData.industry} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">✉️ Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">👤 First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">👤 Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="country">🗺️ Country:</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="state">🏙️ State/Province:</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="inspirationFiles">🎨 Feel free to share any inspirations or ideas (images/PDFs):</label>
          <input type="file" id="inspirationFiles" multiple onChange={handleFileChange} accept="image/*, application/pdf" />
        </div>

        <button type="submit" className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting & Redirecting...' : 'Submit Brief & Go To Payment'}
        </button>

        {message.text && <p className={`form-message ${message.type}`}>{message.text}</p>}
      </form>
    </div>
  );
};

export default BriefFormPage;