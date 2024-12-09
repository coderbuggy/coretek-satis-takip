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
import UrunModal from "../modals/UrunModal";

function Urunler() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      sku: "9JE101AV",
      urunAdi: "9JE101AV HP EliteOne 800 G6 AIO NT PC İ7 10700 16GB-512GB DOS",
      fiyat: "870,00 USD",
      dmoAlisFiyat: "1.100,00 USD",
      dmoSiteFiyat: "40.949,65 TL",
      kategori: "All In One",
    },
    {
      id: 2,
      sku: "98593-K3101	",
      urunAdi: "HP EliteOne 800 G6 AIO NT PC İ7 10500 16GB 512GB W10PRO	",
      fiyat: "1.000,00 USD	",
      dmoAlisFiyat: "1.230,00 USD",
      dmoSiteFiyat: "45.789,15 TL",
      kategori: "All In One",
    },
  ]);

  const [selectedUrun, setSelectedUrun] = useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUrun(null); // Düzenleme işleminden sonra seçili ürünü temizler
  };

  const handleSave = (formData) => {
    if (selectedUrun) {
      // Güncelleme
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === selectedUrun.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Yeni kayıt
      const newUrun = { id: tableData.length + 1, ...formData };
      setTableData((prevData) => [...prevData, newUrun]);
    }
    handleModalClose();
  };

  const handleEdit = (urun) => {
    setSelectedUrun(urun);
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Başlık ve Ürün Ekle Butonu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3, color: "#d32f2f" }}>
          Ürünler
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
          Ürün Ekle
        </Button>
      </Box>

      {/* Tablo */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>SKU</strong>
              </TableCell>
              <TableCell>
                <strong>Ürün Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Fiyat</strong>
              </TableCell>
              <TableCell>
                <strong>DMO Alış Fiyat</strong>
              </TableCell>
              <TableCell>
                <strong>DMO Site Fiyat</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori</strong>
              </TableCell>
              <TableCell>
                <strong>İşlem</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.urunAdi}</TableCell>
                <TableCell>{row.fiyat}</TableCell>
                <TableCell>{row.dmoAlisFiyat}</TableCell>
                <TableCell>{row.dmoSiteFiyat}</TableCell>
                <TableCell>{row.kategori}</TableCell>
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

      {/* Ürün Ekle Modal */}
      <UrunModal
        open={isModalOpen}
        handleClose={handleModalClose}
        onSave={handleSave}
        initialData={selectedUrun}
      />
    </Box>
  );
}

export default Urunler;
