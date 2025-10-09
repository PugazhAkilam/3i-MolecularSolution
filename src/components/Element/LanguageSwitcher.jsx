// LanguageSwitcher.jsx
import React from "react";
import { Select, MenuItem } from "@mui/material";

const LanguageSwitcher = ({ lang, setLang }) => (
  <Select value={lang} onChange={(e) => setLang(e.target.value)} size="small">
    <MenuItem value="en">English</MenuItem>
    <MenuItem value="ta">தமிழ்</MenuItem>
    <MenuItem value="hi">हिन्दी</MenuItem>
  </Select>
);

export default LanguageSwitcher;
