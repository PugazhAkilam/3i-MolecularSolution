import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function PaginatedTable({ rows }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#E7EEF8" }}>
            <TableCell sx={{ fontWeight: 600 }}>Reg ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Visited Doctor</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Visited Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                <Link
                  color="primary"
                  fontWeight={600}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/admin/VisitPatientId`, {
                      state: {
                        regId: row.patientId,
                        name: row.firstName + " " + row.lastName,
                        mobile: row.mobile,
                        age: row.age,
                      },
                    })
                  }
                >
                  {row.patientId}
                </Link>
              </TableCell>
              <TableCell>
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{formatDate(row.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
