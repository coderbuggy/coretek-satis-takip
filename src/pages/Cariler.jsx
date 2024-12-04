import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { HiPlusCircle } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import CariEkleModal from "../modals/CariEkleModal";

function Cariler() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      logoKodu: "12345",
      kurumAdi: "Kupa Bilişim",
      adi: "Ahmet",
      soyadi: "Yılmaz",
      il: "İstanbul",
    },
    {
      id: 2,
      logoKodu: "67890",
      kurumAdi: "Tekno Yazılım",
      adi: "Ayşe",
      soyadi: "Kara",
      il: "Ankara",
    },
  ]);

  const [selectedCari, setSelectedCari] = useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCari(null); // Düzenleme işleminden sonra seçili cariyi temizler
  };

  const handleSave = (formData) => {
    if (selectedCari) {
      // Güncelleme
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === selectedCari.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Yeni kayıt
      const newCari = { id: tableData.length + 1, ...formData };
      setTableData((prevData) => [...prevData, newCari]);
    }
    handleModalClose();
  };

  const handleEdit = (cari) => {
    setSelectedCari(cari);
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Başlık ve Cari Ekle Butonu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          Cariler
        </Typography>
        <Button
          variant="contained"
          startIcon={<HiPlusCircle />}
          onClick={handleModalOpen}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#c62828" },
            textTransform: "none",
          }}
        >
          Cari Ekle
        </Button>
      </Box>

      {/* Tablo */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Logo Kodu</strong>
              </TableCell>
              <TableCell>
                <strong>Kurum Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Soyadı</strong>
              </TableCell>
              <TableCell>
                <strong>İl</strong>
              </TableCell>
              <TableCell>
                <strong>İşlem</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.logoKodu}</TableCell>
                <TableCell>{row.kurumAdi}</TableCell>
                <TableCell>{row.adi}</TableCell>
                <TableCell>{row.soyadi}</TableCell>
                <TableCell>{row.il}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(row)}
                    sx={{
                      color: "#d32f2f",
                      "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
                    }}
                  >
                    <MdEdit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cari Ekle Modal */}
      <CariEkleModal
        open={isModalOpen}
        handleClose={handleModalClose}
        onSave={handleSave}
        initialData={selectedCari}
      />
    </Box>
  );
}

export default Cariler;
