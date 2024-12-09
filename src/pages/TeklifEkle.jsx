import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";

const initialProducts = [
  {
    id: 1,
    urunAdi: "JL319A Aruba 2930M 24G 1-slot Switch",
    sku: "32779-K4476",
    kategori: "Network",
    dmoFiyat: 100,
    satisAdet: 10,
    hibeAdet: 2,
  },
  {
    id: 2,
    urunAdi: "JL320A Aruba 2930M 24G PoE+ 1-slot Switch	",
    sku: "32776-K4476",
    kategori: "Network",
    dmoFiyat: 200,
    satisAdet: 5,
    hibeAdet: 0,
  },
  {
    id: 3,
    urunAdi: "JL254A Aruba 2930F 48G 4SFP+ Switch",
    sku: "29053-K4476",
    kategori: "Network",
    dmoFiyat: 50,
    satisAdet: 20,
    hibeAdet: 5,
  },
  {
    id: 3,
    urunAdi: "JL255A Aruba 2930F 24G PoE+ 4SFP+ Switch",
    sku: "32096-K4476",
    kategori: "Network",
    dmoFiyat: 50,
    satisAdet: 20,
    hibeAdet: 5,
  },
  {
    id: 3,
    urunAdi: "JL073A Aruba 3810M 24G PoE+ 1-slot Switch	",
    sku: "32094-K4476",
    kategori: "Network",
    dmoFiyat: 50,
    satisAdet: 20,
    hibeAdet: 5,
  },
];

function calculateNetKar(satisAdet, hibeAdet, dmoFiyat) {
  return (satisAdet - hibeAdet) * dmoFiyat;
}

const TeklifEkle = () => {
  const [products, setProducts] = useState(initialProducts);

  const { hibeAdedi, hibeTutari, toplamTutar, netKar, tlMarj } = useMemo(() => {
    let totalHibeAdedi = 0;
    let totalHibeTutari = 0;
    let totalNetKar = 0;
    let totalToplamTutar = 0;

    products.forEach((p) => {
      const rowNetKar = calculateNetKar(p.satisAdet, p.hibeAdet, p.dmoFiyat);
      totalHibeAdedi += p.hibeAdet;
      totalHibeTutari += p.hibeAdet * p.dmoFiyat;
      totalNetKar += rowNetKar;
      totalToplamTutar += p.satisAdet * p.dmoFiyat;
    });

    const marj = totalNetKar * 0.1;
    return {
      hibeAdedi: totalHibeAdedi,
      hibeTutari: totalHibeTutari,
      netKar: totalNetKar,
      toplamTutar: totalToplamTutar,
      tlMarj: marj,
    };
  }, [products]);

  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: Number(value) } : p))
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{ color: "#d32f2f" }}>
        Teklif Ekle
      </Typography>

      {/* Bilgi Barı (display: flex) */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",

          boxShadow: 1,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
          <Typography variant="subtitle2">Hibe Adedi</Typography>
          <Typography variant="body1" fontWeight="bold">
            {hibeAdedi}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
          <Typography variant="subtitle2">Hibe Tutarı (TL)</Typography>
          <Typography variant="body1" fontWeight="bold">
            {hibeTutari.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
          <Typography variant="subtitle2">TL Marj</Typography>
          <Typography variant="body1" fontWeight="bold">
            {tlMarj.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
          <Typography variant="subtitle2">Net Kar (TL)</Typography>
          <Typography variant="body1" fontWeight="bold">
            {netKar.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
          <Typography variant="subtitle2">Toplam Tutar (TL)</Typography>
          <Typography variant="body1" fontWeight="bold">
            {toplamTutar.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* Ürünler Tablosu */}
      <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
        <Table
          sx={{
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Ürün Adı</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>SKU</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Kategori</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>DMO Fiyat</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Satış Adet</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Hibe Adet</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong>Net Kar</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => {
              const rowNetKar = calculateNetKar(
                p.satisAdet,
                p.hibeAdet,
                p.dmoFiyat
              );
              let netKarColor = "#000";
              if (rowNetKar > 0) netKarColor = "green";
              if (rowNetKar < 0) netKarColor = "red";
              return (
                <TableRow key={p.id}>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.urunAdi}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.sku}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.kategori}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.dmoFiyat}
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={p.satisAdet}
                      onChange={(e) =>
                        handleChange(p.id, "satisAdet", e.target.value)
                      }
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={p.hibeAdet}
                      onChange={(e) =>
                        handleChange(p.id, "hibeAdet", e.target.value)
                      }
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: netKarColor,
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {rowNetKar.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Kaydet Butonu */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          Kaydet
        </Button>
      </Box>
    </Box>
  );
};

export default TeklifEkle;
