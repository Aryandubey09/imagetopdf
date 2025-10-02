import React, { useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import "./ImageToPdf.css";

const ImageToPdf = () => {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setShowLogin(true);
      return;
    }

    if (!files || files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await axios.post(
        "https://imagetopdf-my47.onrender.com/api/upload/image-to-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPdfUrl(res.data.downloadUrl);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Image to PDF Converter</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button className="bg-blue-600" onClick={handleUpload} disabled={loading}>
        {loading ? "Converting..." : "Convert to PDF"}
      </button>

      {pdfUrl && (
        <div className="pdf-actions">
          <a href={pdfUrl} download className="download-btn">
            Download PDF
          </a>
          <button
            className="share-btn"
            onClick={() => {
              if (navigator.share) {
                try {
                  navigator.share({ title: "PDF File", url: pdfUrl });
                } catch {
                  alert("Cannot share locally. Copy the URL: " + pdfUrl);
                }
              } else {
                alert("Sharing not supported. Copy the URL: " + pdfUrl);
              }
            }}
          >
            Share
          </button>
        </div>
      )}

      {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
    </div>
  );
};

export default ImageToPdf;
