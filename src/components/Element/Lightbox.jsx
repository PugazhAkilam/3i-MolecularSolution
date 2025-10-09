// Lightbox.jsx
import React from "react";

const Lightbox = ({ src, onClose }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center"
  }}
    onClick={onClose}
  >
    <img src={src} alt="preview" style={{ maxHeight: "90%", maxWidth: "90%" }} />
  </div>
);

export default Lightbox;
