import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Paper,
} from "@mui/material";

const initialCurrencies = [
  {
    id: 1,
    isim: "Amerikan Doları",
    simge: "USD",
    dovizKuru: 27.5,
    dmoKur: 27.4,
    aktif: true,
  },
  {
    id: 2,
    isim: "Euro",
    simge: "EUR",
    dovizKuru: 29.8,
    dmoKur: 29.7,
    aktif: false,
  },
  {
    id: 3,
    isim: "İngiliz Sterlini",
    simge: "GBP",
    dovizKuru: 33.9,
    dmoKur: 33.8,
    aktif: true,
  },
  {
    id: 4,
    isim: "Japon Yeni",
    simge: "JPY",
    dovizKuru: 0.19,
    dmoKur: 0.18,
    aktif: false,
  },
  {
    id: 5,
    isim: "Türk Lirası",
    simge: "TRY",
    dovizKuru: 0.19,
    dmoKur: 0.18,
    aktif: false,
  },
];

const Doviz = () => {
  const [currencies, setCurrencies] = useState(initialCurrencies);

  // Güncelleme fonksiyonu (şimdilik statik veri ile)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("API çağrısı yapıldı"); // API entegrasyonu buraya eklenebilir
      setCurrencies((prev) =>
        prev.map((currency) => ({
          ...currency,
          dovizKuru: currency.dovizKuru + Math.random() * 0.1 - 0.05,
        }))
      );
    }, 5000); // 5 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  const handleCheckboxChange = (id) => {
    setCurrencies((prev) =>
      prev.map((currency) =>
        currency.id === id ? { ...currency, aktif: !currency.aktif } : currency
      )
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#d32f2f" }}>
        Döviz Ekranı
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>İsim</strong>
              </TableCell>
              <TableCell>
                <strong>Simge</strong>
              </TableCell>
              <TableCell>
                <strong>Döviz Kuru</strong>
              </TableCell>
              <TableCell>
                <strong>DMO Kur</strong>
              </TableCell>
              <TableCell>
                <strong>Aktif</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow key={currency.id}>
                <TableCell>{currency.isim}</TableCell>
                <TableCell>{currency.simge}</TableCell>
                <TableCell>{currency.dovizKuru.toFixed(2)}</TableCell>
                <TableCell>{currency.dmoKur.toFixed(2)}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={currency.aktif}
                    onChange={() => handleCheckboxChange(currency.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Doviz;
