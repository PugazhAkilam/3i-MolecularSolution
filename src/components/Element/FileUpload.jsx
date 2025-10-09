// FileUpload.js
import React from "react";
import { Button } from "@mui/material";

const FileUpload = ({ onChange }) => (
  <Button variant="outlined" component="label">
    Upload File
    <input type="file" hidden onChange={onChange} />
  </Button>
);

export default FileUpload;
