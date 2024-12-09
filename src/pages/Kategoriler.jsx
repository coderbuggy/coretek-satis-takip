import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const initialCategories = [
  { id: 1, kategoriAdi: "All In One" },
  { id: 2, kategoriAdi: "Monitör" },
  { id: 3, kategoriAdi: "Network" },
  { id: 4, kategoriAdi: "Notebook" },
  { id: 5, kategoriAdi: "PC" },
  { id: 6, kategoriAdi: "Workstation" },
  { id: 7, kategoriAdi: "Yazıcı" },
  { id: 8, kategoriAdi: "Sarf" },
  { id: 9, kategoriAdi: "Tarayıcı" },
];

const Kategoriler = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editId, setEditId] = useState(null); // Düzenlenen satırın ID'si
  const [editValue, setEditValue] = useState(""); // Düzenlenen kategori adı

  const handleEdit = (id, currentValue) => {
    setEditId(id);
    setEditValue(currentValue);
  };

  const handleSave = (id) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, kategoriAdi: editValue } : category
      )
    );
    setEditId(null); // Düzenleme modundan çık
    setEditValue("");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#d32f2f" }}>
        Kategoriler Ekranı
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori Adı</strong>
              </TableCell>
              <TableCell>
                <strong>İşlem</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                {/* ID Sütunu */}
                <TableCell>{category.id}</TableCell>
                {/* Kategori Adı Sütunu */}
                <TableCell>
                  {editId === category.id ? (
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    category.kategoriAdi
                  )}
                </TableCell>
                {/* İşlem Sütunu */}
                <TableCell>
                  {editId === category.id ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                      }}
                      onClick={() => handleSave(category.id)}
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
                      }}
                      onClick={() =>
                        handleEdit(category.id, category.kategoriAdi)
                      }
                    >
                      Düzenle
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Kategoriler;
