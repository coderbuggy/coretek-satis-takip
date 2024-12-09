import { useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { HiMiniXMark } from "react-icons/hi2";

import { useForm } from "react-hook-form";

const UrunModal = ({ open, handleClose, onSave, initialData }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (open && !initialData) {
      // Modal açıldığında ve initialData yoksa formu sıfırla
      reset();
    } else if (initialData) {
      // initialData varsa formu doldur
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="urun-ekle-modal"
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
        {/* Çarpı Butonu */}
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
          id="urun-ekle-modal"
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#d32f2f" }}
        >
          {initialData ? "Ürün Düzenle" : "Ürün Ekle"}
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="SKU" fullWidth {...register("sku")} />
          <TextField label="Ürün Adı" fullWidth {...register("urunAdi")} />
          <TextField label="Fiyat" fullWidth {...register("fiyat")} />
          <TextField
            label="DMO Alış Fiyatı"
            fullWidth
            {...register("dmoAlisFiyat")}
          />
          <TextField
            label="DMO Site Fiyatı"
            fullWidth
            {...register("dmoSiteFiyat")}
          />
          <TextField label="Kategori" fullWidth {...register("kategori")} />

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

export default UrunModal;
