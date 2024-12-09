import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import { HiOutlinePencilSquare, HiPlusCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

// Örnek veri
const initialOffers = [
  {
    id: 1,
    tarih: "2024-12-10",
    saat: "10:30",
    kurumAdi: "ABC Teknoloji",
    temsilci: "Ahmet",
    il: "İstanbul",
    netTutar: 1000,
    kdv: 180,
    toplamTutar: 1180,
    kar: 200,
    durum: "yeni",
    onaylanmamis: true,
  },
  {
    id: 2,
    tarih: "2024-12-11",
    saat: "11:00",
    kurumAdi: "XYZ İnşaat",
    temsilci: "Mehmet",
    il: "Ankara",
    netTutar: 2000,
    kdv: 360,
    toplamTutar: 2360,
    kar: 500,
    durum: "kazanıldı",
    onaylanmamis: false,
  },
  {
    id: 3,
    tarih: "2024-12-12",
    saat: "09:45",
    kurumAdi: "MNO Lojistik",
    temsilci: "Ayşe",
    il: "İzmir",
    netTutar: 500,
    kdv: 90,
    toplamTutar: 590,
    kar: 100,
    durum: "kaybedildi",
    onaylanmamis: true,
  },
  {
    id: 4,
    tarih: "2024-12-13",
    saat: "14:20",
    kurumAdi: "QRS Elektronik",
    temsilci: "Fatma",
    il: "Bursa",
    netTutar: 3000,
    kdv: 540,
    toplamTutar: 3540,
    kar: 700,
    durum: "iptal edildi",
    onaylanmamis: false,
  },
];

// Sıralama fonksiyonları
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const Teklifler = () => {
  const [offers, setOffers] = useState(initialOffers);

  // Filtre state'leri
  const [durum, setDurum] = useState("tümü");
  const [cari, setCari] = useState("");
  const [temsilci, setTemsilci] = useState("");
  const [il, setIl] = useState("");
  const [baslangicTarih, setBaslangicTarih] = useState("");
  const [bitisTarih, setBitisTarih] = useState("");

  // Sıralama state'leri
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("tarih");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Filtreleme mantığı (basit)
  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      let durumCheck = durum === "tümü" || offer.durum === durum;
      let cariCheck =
        !cari || offer.kurumAdi.toLowerCase().includes(cari.toLowerCase());
      let temsilciCheck =
        !temsilci ||
        offer.temsilci.toLowerCase().includes(temsilci.toLowerCase());
      let ilCheck = !il || offer.il === il;
      let baslangicCheck = !baslangicTarih || offer.tarih >= baslangicTarih;
      let bitisCheck = !bitisTarih || offer.tarih <= bitisTarih;

      return (
        durumCheck &&
        cariCheck &&
        temsilciCheck &&
        ilCheck &&
        baslangicCheck &&
        bitisCheck
      );
    });
  }, [offers, durum, cari, temsilci, il, baslangicTarih, bitisTarih]);

  // Sıralanmış veriyi hesapla
  const sortedOffers = useMemo(() => {
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = filteredOffers.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const orderComp = comparator(a[0], b[0]);
      if (orderComp !== 0) return orderComp;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }, [filteredOffers, order, orderBy]);

  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ color: "#d32f2f" }}>
        Teklifler
      </Typography>

      {/* Filtre Alanları */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Durum</InputLabel>
          <Select
            value={durum}
            label="Durum"
            onChange={(e) => setDurum(e.target.value)}
          >
            <MenuItem value="tümü">Tümü</MenuItem>
            <MenuItem value="yeni">Yeni</MenuItem>
            <MenuItem value="kazanıldı">Kazanıldı</MenuItem>
            <MenuItem value="kaybedildi">Kaybedildi</MenuItem>
            <MenuItem value="iptal edildi">İptal Edildi</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Cari (Kurum Adı)"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
        <TextField
          label="Temsilci"
          value={temsilci}
          onChange={(e) => setTemsilci(e.target.value)}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>İl</InputLabel>
          <Select value={il} label="İl" onChange={(e) => setIl(e.target.value)}>
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value="İstanbul">İstanbul</MenuItem>
            <MenuItem value="Ankara">Ankara</MenuItem>
            <MenuItem value="İzmir">İzmir</MenuItem>
            <MenuItem value="Bursa">Bursa</MenuItem>
            <MenuItem value="Antalya">Antalya</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Başlangıç Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={baslangicTarih}
          onChange={(e) => setBaslangicTarih(e.target.value)}
        />

        <TextField
          label="Bitiş Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={bitisTarih}
          onChange={(e) => setBitisTarih(e.target.value)}
        />
      </Box>

      {/* Üst Sağda Teklif Ekle Butonu */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<HiPlusCircle />}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#c62828" },
          }}
          onClick={() => navigate("/teklif-ekle")}
        >
          Teklif Ekle
        </Button>
      </Box>

      {/* Tablo */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>İşlemler</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("tarih")}>
                <strong>Tarih</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("saat")}>
                <strong>Saat</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("kurumAdi")}>
                <strong>Kurum Adı</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("temsilci")}>
                <strong>Temsilci</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("il")}>
                <strong>İl</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("netTutar")}>
                <strong>Net Tutar</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("kdv")}>
                <strong>KDV</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("toplamTutar")}>
                <strong>Toplam Tutar</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("kar")}>
                <strong>Kar</strong>
              </TableCell>
              <TableCell onClick={() => handleSort("durum")}>
                <strong>Durum</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOffers.map((offer) => (
              <TableRow
                key={offer.id}
                sx={{
                  backgroundColor: offer.onaylanmamis
                    ? "rgba(255, 0, 0, 0.1)"
                    : "inherit",
                }}
              >
                <TableCell>
                  <IconButton sx={{ color: "#d32f2f" }}>
                    <HiOutlinePencilSquare size={18} />
                  </IconButton>
                </TableCell>
                <TableCell>{offer.tarih}</TableCell>
                <TableCell>{offer.saat}</TableCell>
                <TableCell>{offer.kurumAdi}</TableCell>
                <TableCell>{offer.temsilci}</TableCell>
                <TableCell>{offer.il}</TableCell>
                <TableCell>{offer.netTutar}</TableCell>
                <TableCell>{offer.kdv}</TableCell>
                <TableCell>{offer.toplamTutar}</TableCell>
                <TableCell>{offer.kar}</TableCell>
                <TableCell>{offer.durum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Teklifler;
