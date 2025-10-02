import React, { useState } from "react";
import SignupModal from "./SignupModal";
import axios from "axios";
import "./Modal.css";

const LoginModal = ({ closeModal }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle login with backend
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://imagetopdf-372x.onrender.com/api/auth/login", {
        email,
        password,
      });

      // ✅ Save token & email to localStorage
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userEmail", res.data.email);

      closeModal(); // close modal after successful login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Switch to Signup Modal
  if (showSignup) {
    return (
      <SignupModal
        backToLogin={() => setShowSignup(false)}
        closeModal={closeModal}
      />
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Login</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col w-full space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <span
          className="switch-link"
          onClick={() => setShowSignup(true)}
        >
          New here? Create account
        </span>

        <span className="close-btn" onClick={closeModal}>✕</span>
      </div>
    </div>
  );
};

export default LoginModal;
