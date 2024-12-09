import { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { HiMiniXMark } from "react-icons/hi2";

const KullaniciModal = ({ open, handleClose, onSave }) => {
  const [email, setEmail] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreOnay, setSifreOnay] = useState("");
  const [yetki, setYetki] = useState("kullanıcı");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sifre !== sifreOnay) {
      setError("Şifreler eşleşmiyor!");
      return;
    }
    setError("");

    const newUser = {
      id: Date.now(), // geçici id
      email,
      rol: yetki,
      kullaniciAdi,
    };
    onSave(newUser);
    // Form sıfırla
    setEmail("");
    setKullaniciAdi("");
    setSifre("");
    setSifreOnay("");
    setYetki("kullanıcı");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="kullanici-ekle-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
          width: "400px",
          position: "relative",
        }}
      >
        {/* Kapat Butonu */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#d32f2f",
          }}
        >
          <HiMiniXMark />
        </IconButton>

        {/* Başlık */}
        <Typography
          id="kullanici-ekle-modal"
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#d32f2f" }}
        >
          Kullanıcı Ekle
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Kullanıcı Adı"
            fullWidth
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            required
          />
          <TextField
            label="Şifre"
            type="password"
            fullWidth
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
          />
          <TextField
            label="Şifre Onay"
            type="password"
            fullWidth
            value={sifreOnay}
            onChange={(e) => setSifreOnay(e.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Yetki</InputLabel>
            <Select
              value={yetki}
              label="Yetki"
              onChange={(e) => setYetki(e.target.value)}
            >
              <MenuItem value="yönetici">Yönetici</MenuItem>
              <MenuItem value="kullanıcı">Kullanıcı</MenuItem>
              <MenuItem value="muhasebe">Muhasebe</MenuItem>
            </Select>
          </FormControl>

          {/* Kaydet Butonu */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "#d32f2f",
              "&:hover": { backgroundColor: "#c62828" },
            }}
          >
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default KullaniciModal;
