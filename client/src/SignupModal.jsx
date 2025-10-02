import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const SignupModal = ({ backToLogin, closeModal }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
    const res = await axios.post(
  "https://imagetopdf-372x.onrender.com/api/auth/signup",
  { email, phone, password },
  {
    headers: { "Content-Type": "application/json" },
  }
);


      // ✅ Signup successful, auto login (optional) or just close modal
      // Agar backend return token bhi kare to save:
      // localStorage.setItem("authToken", res.data.token);

      alert("Signup successful! Please login."); 
      backToLogin(); // switch to login modal
    } catch (err) {
  console.error(err.response); // yahan full backend response dikhega
  setError(err.response?.data?.message || "Signup failed");
}
 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Account</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col w-full space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <span className="switch-link" onClick={backToLogin}>
          Already have an account? Login
        </span>

        <span className="close-btn" onClick={closeModal}>✕</span>
      </div>
    </div>
  );
};

export default SignupModal;
