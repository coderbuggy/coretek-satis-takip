import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const initialRisturnData = [
  { id: 1, min: 0, max: 1000, yuzde: 5 },
  { id: 2, min: 1001, max: 5000, yuzde: 7.5 },
  { id: 3, min: 5001, max: 10000, yuzde: 10 },
];

const Risturn = () => {
  const [data, setData] = useState(initialRisturnData);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({ min: "", max: "", yuzde: "" });

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditValues({ min: row.min, max: row.max, yuzde: row.yuzde });
  };

  const handleSave = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              min: Number(editValues.min),
              max: Number(editValues.max),
              yuzde: Number(editValues.yuzde),
            }
          : item
      )
    );
    setEditId(null);
    setEditValues({ min: "", max: "", yuzde: "" });
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#d32f2f" }}>
        Risturn Ekranı
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Sıra No</strong>
              </TableCell>
              <TableCell>
                <strong>Min</strong>
              </TableCell>
              <TableCell>
                <strong>Max</strong>
              </TableCell>
              <TableCell>
                <strong>Yüzde</strong>
              </TableCell>
              <TableCell>
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      value={editValues.min}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      type="number"
                      size="small"
                    />
                  ) : (
                    row.min
                  )}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      value={editValues.max}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      type="number"
                      size="small"
                    />
                  ) : (
                    row.max
                  )}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      value={editValues.yuzde}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          yuzde: e.target.value,
                        }))
                      }
                      type="number"
                      size="small"
                    />
                  ) : (
                    row.yuzde
                  )}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                        marginRight: 1,
                      }}
                      onClick={() => handleSave(row.id)}
                    >
                      Kaydet
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#d32f2f",
                        "&:hover": { backgroundColor: "#c62828" },
                        marginRight: 1,
                      }}
                      onClick={() => handleEdit(row)}
                      startIcon={<HiOutlinePencilSquare />}
                    >
                      Düzenle
                    </Button>
                  )}
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    sx={{ color: "#d32f2f" }}
                  >
                    <HiOutlineTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Risturn;
