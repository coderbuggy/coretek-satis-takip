import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const statData = {
  totalOffers: 120,
  wonOffers: 45,
  lostOffers: 30,
  canceledOffers: 10,
};

// Son 7 gün yapılan teklif sayıları (statik veri)
const offerTrendData = [
  { day: "Pzt", count: 5 },
  { day: "Sal", count: 8 },
  { day: "Çar", count: 12 },
  { day: "Per", count: 9 },
  { day: "Cum", count: 15 },
  { day: "Cts", count: 7 },
  { day: "Paz", count: 10 },
];

// Son eklenen teklifler (statik veri)
const recentOffers = [
  {
    id: 201,
    kurumAdi: "ABC Teknoloji",
    tarih: "2024-12-15",
    durum: "yeni",
    tutar: 2000,
  },
  {
    id: 202,
    kurumAdi: "XYZ İnşaat",
    tarih: "2024-12-14",
    durum: "kazanıldı",
    tutar: 3500,
  },
  {
    id: 203,
    kurumAdi: "MNO Lojistik",
    tarih: "2024-12-14",
    durum: "kaybedildi",
    tutar: 1500,
  },
];

// Statik döviz kurları (1 birim para birimi kaç TL)
const currencyRates = [
  { currency: "USD", rate: 27.5 },
  { currency: "EUR", rate: 29.8 },
  { currency: "JPY", rate: 0.19 },
  { currency: "TRY", rate: 1.0 },
];

const mainColor = "#d32f2f";

const Anasayfa = () => {
  const navigate = useNavigate();

  // Döviz çevirici state'leri
  const [fromCurrency, setFromCurrency] = useState("TRY");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);

  const fromRate =
    currencyRates.find((c) => c.currency === fromCurrency)?.rate || 1;
  const toRate =
    currencyRates.find((c) => c.currency === toCurrency)?.rate || 1;
  const convertedValue = amount * (fromRate / toRate);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textTransform: "capitalize",
      }}
    >
      <Typography variant="h4" sx={{ color: mainColor, fontWeight: "bold" }}>
        Anasayfa
      </Typography>

      {/* İstatistik Kartları */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ p: 2, textAlign: "center", boxShadow: 3, borderRadius: 2 }}
          >
            <Typography variant="subtitle1">Toplam teklif</Typography>
            <Typography variant="h5" fontWeight="bold">
              {statData.totalOffers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#e8f5e9",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1">Kazanılan</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "green" }}>
              {statData.wonOffers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#ffebee",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1">Kaybedilen</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "red" }}>
              {statData.lostOffers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff8e1",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1">İptal edildi</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "orange" }}>
              {statData.canceledOffers}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Hızlı Erişim Butonları */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: mainColor,
            "&:hover": { backgroundColor: "#c62828" },
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
          onClick={() => navigate("/teklif-ekle")}
        >
          Yeni teklif
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: mainColor,
            color: mainColor,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "capitalize",
            "&:hover": {
              borderColor: "#c62828",
              color: "#c62828",
            },
          }}
          onClick={() => navigate("/cariler")}
        >
          Cariler
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: mainColor,
            color: mainColor,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "capitalize",
            "&:hover": {
              borderColor: "#c62828",
              color: "#c62828",
            },
          }}
          onClick={() => navigate("/urunler")}
        >
          Ürünler
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: mainColor,
            color: mainColor,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "capitalize",
            "&:hover": {
              borderColor: "#c62828",
              color: "#c62828",
            },
          }}
          onClick={() => navigate("/doviz")}
        >
          Döviz
        </Button>
      </Box>

      {/* Grafik ve Son Teklifler */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400, boxShadow: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold", color: mainColor }}
            >
              Son 7 günlük teklif trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={offerTrendData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={mainColor}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              height: 400,
              overflowY: "auto",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold", color: mainColor }}
            >
              Son eklenen teklifler
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Id</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Kurum</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Tarih</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Durum</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Tutar</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>{offer.id}</TableCell>
                      <TableCell>{offer.kurumAdi}</TableCell>
                      <TableCell>{offer.tarih}</TableCell>
                      <TableCell>{offer.durum}</TableCell>
                      <TableCell>{offer.tutar} Tl</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Güncel Kurlar ve Döviz Çevirici Yan Yana */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: 300 }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold", color: mainColor }}
            >
              Güncel kurlar (statik)
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Döviz</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Kur (tl)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currencyRates.map((rate) => (
                    <TableRow key={rate.currency}>
                      <TableCell>{rate.currency}</TableCell>
                      <TableCell>{rate.rate.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              height: 300,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: mainColor }}
            >
              Döviz çevirici
            </Typography>
            <TextField
              label="Miktar"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              fullWidth
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>From</InputLabel>
              <Select
                value={fromCurrency}
                label="From"
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyRates.map((cr) => (
                  <MenuItem key={cr.currency} value={cr.currency}>
                    {cr.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>To</InputLabel>
              <Select
                value={toCurrency}
                label="To"
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyRates.map((cr) => (
                  <MenuItem key={cr.currency} value={cr.currency}>
                    {cr.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: mainColor }}
            >
              Sonuç: {convertedValue.toFixed(4)} {toCurrency}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Anasayfa;
