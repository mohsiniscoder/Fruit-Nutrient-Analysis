import React, { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../contexts/AuthContext";

const ImageUploader = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const { mfaVerified } = useContext(AuthContext);

  const validateFile = (f) => {
    const allowed = ["image/jpeg","image/png","image/webp"];
    if (!allowed.includes(f.type)) return "Only JPEG, PNG or WEBP allowed";
    if (f.size > 5 * 1024 * 1024) return "Max 5MB";
    return null;
  };

  const handlePick = (e) => {
    const f = e.target.files[0];
    const err = f && validateFile(f);
    if (err) {
      setError(err);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
    onResult(null);
  };

  const handleUpload = async () => {
    if (!mfaVerified) {
      setError("MFA required before uploading");
      return;
    }
    if (!file) {
      setError("Please choose an image first");
      return;
    }
    setError("");
    const form = new FormData();
    form.append("image", file);

    try {
      const { data } = await api.post("/analyze", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(data.nutrients);
    } catch {
      setError("Upload failed — network or server error");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handlePick} />
      {error && <p className="text-red-600">{error}</p>}
      {preview && <img src={preview} alt="preview" className="w-32 h-32" />}
      <button onClick={handleUpload}>Analyze Nutrients</button>
    </div>
  );
};

export default ImageUploader;
