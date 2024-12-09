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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    urunAdi: "Ürün A",
    sku: "A001",
    kategori: "Elektronik",
    dmoFiyat: 100,
    satisAdet: 10,
    hibeAdet: 2,
  },
  {
    id: 2,
    urunAdi: "Ürün B",
    sku: "B002",
    kategori: "Mobilya",
    dmoFiyat: 200,
    satisAdet: 5,
    hibeAdet: 0,
  },
  {
    id: 3,
    urunAdi: "Ürün C",
    sku: "C003",
    kategori: "Kitap",
    dmoFiyat: 50,
    satisAdet: 20,
    hibeAdet: 5,
  },
];

const cariList = [
  {
    value: "cari1",
    label: "ABC Teknoloji",
    logoKodu: "001",
    kurumAdi: "ABC Teknoloji A.Ş.",
    adi: "Ali",
    soyadi: "Yılmaz",
    il: "İstanbul",
  },
  {
    value: "cari2",
    label: "XYZ İnşaat",
    logoKodu: "002",
    kurumAdi: "XYZ İnşaat Ltd.",
    adi: "Ayşe",
    soyadi: "Demir",
    il: "Ankara",
  },
  {
    value: "cari3",
    label: "MNO Lojistik",
    logoKodu: "003",
    kurumAdi: "MNO Lojistik A.Ş.",
    adi: "Mehmet",
    soyadi: "Kara",
    il: "İzmir",
  },
  {
    value: "cari4",
    label: "QRS Elektronik",
    logoKodu: "004",
    kurumAdi: "QRS Elektronik Ltd.",
    adi: "Fatma",
    soyadi: "Kurt",
    il: "Bursa",
  },
  {
    value: "cari5",
    label: "TUV Gıda",
    logoKodu: "005",
    kurumAdi: "TUV Gıda A.Ş.",
    adi: "Ahmet",
    soyadi: "Çelik",
    il: "Antalya",
  },
];

const iller = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

function calculateNetKar(satisAdet, hibeAdet, dmoFiyat) {
  return (satisAdet - hibeAdet) * dmoFiyat;
}

const TeklifDuzenle = () => {
  const { id } = useParams(); // Teklif id'sini urlden alıyoruz (/teklif-duzenle/:id)
  const [products, setProducts] = useState(initialProducts);

  // Sipariş bilgileri state'leri
  const [siparisNo, setSiparisNo] = useState("SIP12345");
  const [siparisTarih, setSiparisTarih] = useState("2024-12-15");
  const [siparisDurumu, setSiparisDurumu] = useState("Yeni");

  // Cari bilgisi state'leri
  const [selectedCari, setSelectedCari] = useState("cari1");
  const [selectedIl, setSelectedIl] = useState("İstanbul");

  const selectedCariData = cariList.find((c) => c.value === selectedCari);

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

  const handleOnayla = () => {
    // Sipariş ve cari bilgilerini kaydetme işlemleri
    alert("Onaylandı!");
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{ color: "#d32f2f" }}>
        Teklif Düzenle (ID: {id})
      </Typography>

      {/* Bilgi Barı (display: flex) */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          width: "100%",
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
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "hidden" }}
      >
        <Table
          sx={{
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Ürün Adı</strong>
              </TableCell>
              <TableCell>
                <strong>SKU</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori</strong>
              </TableCell>
              <TableCell>
                <strong>DMO Fiyat</strong>
              </TableCell>
              <TableCell>
                <strong>Satış Adet</strong>
              </TableCell>
              <TableCell>
                <strong>Hibe Adet</strong>
              </TableCell>
              <TableCell>
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
                  <TableCell>{p.urunAdi}</TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell>{p.kategori}</TableCell>
                  <TableCell>{p.dmoFiyat}</TableCell>
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
                  <TableCell sx={{ color: netKarColor, fontWeight: "bold" }}>
                    {rowNetKar.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Alt Kısım: Yan Yana 2 Kutu */}
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        {/* Sol Kutu: Sipariş Bilgileri */}
        <Box
          sx={{ flex: 1, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "#d32f2f" }}>
            Sipariş Bilgileri
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Sipariş No"
              value={siparisNo}
              onChange={(e) => setSiparisNo(e.target.value)}
              fullWidth
            />
            <TextField
              label="Sipariş Tarih"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={siparisTarih}
              onChange={(e) => setSiparisTarih(e.target.value)}
              fullWidth
            />
            <TextField
              label="Sipariş Durumu"
              value={siparisDurumu}
              disabled
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Sipariş Durumu Değiştir</InputLabel>
              <Select
                value={siparisDurumu}
                label="Sipariş Durumu Değiştir"
                onChange={(e) => setSiparisDurumu(e.target.value)}
              >
                <MenuItem value="Yeni">Yeni</MenuItem>
                <MenuItem value="Kazanıldı">Kazanıldı</MenuItem>
                <MenuItem value="Kaybedildi">Kaybedildi</MenuItem>
                <MenuItem value="İptal edildi">İptal edildi</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#c62828" },
              }}
              onClick={handleOnayla}
            >
              Onayla
            </Button>
          </Box>
        </Box>

        {/* Sağ Kutu: Cari Bilgisi */}
        <Box
          sx={{ flex: 1, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "#d32f2f" }}>
            Cari Bilgisi
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Cari Seç</InputLabel>
              <Select
                value={selectedCari}
                label="Cari Seç"
                onChange={(e) => {
                  setSelectedCari(e.target.value);
                  setSelectedIl(
                    cariList.find((c) => c.value === e.target.value)?.il ||
                      "İstanbul"
                  );
                }}
              >
                {cariList.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Logo Kodu"
              value={selectedCariData?.logoKodu || ""}
              disabled
              fullWidth
            />
            <TextField
              label="Kurum Adı"
              value={selectedCariData?.kurumAdi || ""}
              disabled
              fullWidth
            />
            <TextField
              label="Adı"
              value={selectedCariData?.adi || ""}
              disabled
              fullWidth
            />
            <TextField
              label="Soyadı"
              value={selectedCariData?.soyadi || ""}
              disabled
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>İl</InputLabel>
              <Select
                value={selectedIl}
                label="İl"
                onChange={(e) => setSelectedIl(e.target.value)}
              >
                {iller.map((il) => (
                  <MenuItem key={il} value={il}>
                    {il}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeklifDuzenle;
