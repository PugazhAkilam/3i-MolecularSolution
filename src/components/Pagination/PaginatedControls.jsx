// src/components/PaginationControls.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";

const PaginationControls = ({
  currentPage,
  totalCount,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };



  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalCount);

  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      fontSize={14}
      color="text.secondary"
    >
      <Typography>
        Showing {totalCount === 0 ? 0 : `${start} to ${end}`} of {totalCount} patients
      </Typography>

      <Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2, minWidth: 80, mr: 1, px: 2, textTransform: "none" }}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2, minWidth: 80, px: 2, textTransform: "none" }}
          onClick={handleNext}
          disabled={currentPage === totalPages || totalCount === 0}
        >
          Next &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationControls;
