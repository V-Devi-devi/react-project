import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default function StudentForm({ student, onClose }) {
  // Pre-fill if editing, empty if creating
  const [name, setName] = useState(student?.name || "");
  const [age, setAge] = useState(student?.age || "");
  const [email, setEmail] = useState(student?.email || "");
  const [city, setCity] = useState(student?.city || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = !!student;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = { name, age: parseInt(age), email, city };

    try {
      if (isEditing) {
        await axios.put(
          `${API_BASE}/students/${student.id}`,
          data,
          authHeader(),
        );
      } else {
        await axios.post(`${API_BASE}/students`, data, authHeader());
      }
      onClose(); // success — close form, parent re-fetches list
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sma-modal-overlay" onClick={onClose}>
      <div className="sma-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sma-modal-header">
          <h3 className="sma-modal-title">
            {isEditing ? "Edit Student" : "Add New Student"}
          </h3>
          <button className="sma-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="sma-alert sma-alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="sma-form">
          <div className="sma-form-group">
            <label className="sma-label">Name</label>
            <input
              type="text"
              className="sma-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Age</label>
            <input
              type="number"
              className="sma-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
              max="100"
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Email</label>
            <input
              type="email"
              className="sma-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">City</label>
            <input
              type="text"
              className="sma-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="sma-modal-actions">
            <button
              type="button"
              className="sma-btn sma-btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sma-btn sma-btn-primary"
              disabled={loading || !name || !age || !email}
            >
              {loading
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}