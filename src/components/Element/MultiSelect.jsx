// TagInput.js
import React, { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");

  const handleAdd = (e) => {
    if (e.key === "Enter" && value.trim()) {
      setTags([...tags, value.trim()]);
      setValue("");
    }
  };

  return (
    <Box>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleAdd}
        label="Enter tags"
      />
      <Box mt={1}>
        {tags.map((tag, i) => (
          <Chip key={i} label={tag} onDelete={() => setTags(tags.filter((_, idx) => idx !== i))} />
        ))}
      </Box>
    </Box>
  );
};

export default TagInput;
