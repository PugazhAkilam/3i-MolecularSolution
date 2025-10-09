// CustomTable.js
import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";

const CustomTable = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field}>{col.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.field}>{row[col.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
