import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

const Ayarlar = () => {
  // State'ler
  const [rebate, setRebate] = useState(5); // örnek varsayılan değer
  const [damgaVergisi, setDamgaVergisi] = useState(1.5);
  const [kargoTutari, setKargoTutari] = useState(50);
  const [karlilik, setKarlilik] = useState(20);
  const [siparisOnayLimiti, setSiparisOnayLimiti] = useState(1000);

  const handleSave = () => {
    // Kaydetme işlemlerini burada yapabilirsiniz.
    console.log({
      rebate,
      damgaVergisi,
      kargoTutari,
      karlilik,
      siparisOnayLimiti,
    });
    alert("Ayarlar kaydedildi!");
  };

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ color: "#d32f2f", marginBottom: 2 }}>
        Ayarlar
      </Typography>

      {/* Rebate */}
      <TextField
        label="Rebate"
        type="number"
        value={rebate}
        onChange={(e) => setRebate(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        fullWidth
      />

      {/* Damga Vergisi */}
      <TextField
        label="Damga Vergisi"
        type="number"
        value={damgaVergisi}
        onChange={(e) => setDamgaVergisi(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        fullWidth
      />

      {/* Kargo Tutarı */}
      <TextField
        label="Kargo Tutarı"
        type="number"
        value={kargoTutari}
        onChange={(e) => setKargoTutari(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">TL</InputAdornment>,
        }}
        fullWidth
      />

      {/* Kârlılık */}
      <TextField
        label="Kârlılık"
        type="number"
        value={karlilik}
        onChange={(e) => setKarlilik(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        fullWidth
      />

      {/* Sipariş Onay Limiti */}
      <TextField
        label="Sipariş Onay Limiti"
        type="number"
        value={siparisOnayLimiti}
        onChange={(e) => setSiparisOnayLimiti(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">TL</InputAdornment>,
        }}
        fullWidth
      />

      {/* Kaydet Butonu */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#d32f2f",
          "&:hover": { backgroundColor: "#c62828" },
          alignSelf: "flex-start",
        }}
        onClick={handleSave}
      >
        Kaydet
      </Button>
    </Box>
  );
};

export default Ayarlar;
