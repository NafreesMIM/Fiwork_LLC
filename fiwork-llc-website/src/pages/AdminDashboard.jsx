// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const AdminDashboard = () => {
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'clientBriefs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const briefsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBriefs(briefsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching briefs:", err);
      setError("Failed to load briefs. Check console for details.");
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const handleStatusUpdate = async (briefId, newStatus) => {
    const briefRef = doc(db, 'clientBriefs', briefId);
    try {
      await updateDoc(briefRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        // Add specific fields for manual payment confirmation if this is the trigger
        ...(newStatus === "Payment Received - In Progress" && {
          paymentConfirmedManuallyAt: serverTimestamp()
        })
      });
      console.log(`Brief ${briefId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating brief status:", err);
      alert("Failed to update status. Check console for details.");
    }
  };

  if (loading) return <div className="loading-spinner">Loading Admin Dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard - Client Briefs</h1>
      <p className="page-description">Manage client submissions and project statuses.</p>

      {briefs.length === 0 ? (
        <p>No client briefs submitted yet.</p>
      ) : (
        <div className="briefs-list">
          {briefs.map((brief) => (
            <div key={brief.id} className="brief-card">
              <h3>Brief ID: {brief.id}</h3>
              <p><strong>Brand:</strong> {brief.brandName}</p>
              <p><strong>Package:</strong> {brief.selectedPackage}</p>
              <p><strong>Status:</strong> <span className={`status-tag status-${brief.status.replace(/\s/g, '-').toLowerCase()}`}>{brief.status}</span></p>
              <p><strong>Client:</strong> {brief.firstName} {brief.lastName} ({brief.email})</p>
              <p><strong>Description:</strong> {brief.description}</p>
              {brief.preferredColors && <p><strong>Colors:</strong> {brief.preferredColors}</p>}
              {brief.industry && <p><strong>Industry:</strong> {brief.industry}</p>}
              {brief.inspirationFiles && brief.inspirationFiles.length > 0 && (
                <div>
                  <strong>Inspiration Files:</strong>
                  <ul>
                    {brief.inspirationFiles.map((file, idx) => (
                      <li key={idx}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {brief.aiAnalysis && (
                <div className="ai-analysis-box">
                  <h4>AI Analysis:</h4>
                  <p>{brief.aiAnalysis}</p>
                  <small>Processed: {new Date(brief.aiProcessedAt?.toDate()).toLocaleString()}</small>
                </div>
              )}
              <div className="brief-actions">
                {brief.status === "Pending Payment" && (
                  <button
                    className="button-primary"
                    onClick={() => handleStatusUpdate(brief.id, "Payment Received - In Progress")}
                  >
                    Mark as Payment Received
                  </button>
                )}
                {brief.status === "Payment Received - In Progress" && !brief.aiAnalysis && (
                   <button
                   className="button-secondary"
                   // This button would trigger a Callable Cloud Function to run AI if you didn't use an onUpdate trigger
                   // For now, it will automatically happen when status changes above.
                   disabled
                   title="AI analysis will trigger automatically on 'Payment Received' status."
                 >
                   AI Analysis (Auto)
                 </button>
                )}
                 {brief.status === "Payment Received - In Progress" && (
                  <button
                    className="button-secondary"
                    onClick={() => handleStatusUpdate(brief.id, "Awaiting Feedback")}
                  >
                    Mark as Concepts Sent
                  </button>
                )}
                {/* Add more status buttons as needed */}
              </div>
              <small>Submitted: {new Date(brief.createdAt?.toDate()).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;