import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "16px",
        alignItems: "center",
        background: "linear-gradient(135deg, #d2d1d1 0%, #ce6767 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://kupa.com.tr/wp-content/uploads/2022/10/logo_2-300x142-removebg-preview-1.png')`,
          backgroundSize: "150px",
          backgroundRepeat: "repeat",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#d32f2f",
              textAlign: "center",
            }}
          >
            Hoş Geldiniz
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="E-posta"
              type="email"
              fullWidth
              {...register("email")}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              label="Şifre"
              type="password"
              fullWidth
              {...register("password")}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                marginTop: 2,
                padding: "12px",
                borderRadius: "16px",
                fontSize: "1.1rem",
                textTransform: "none",
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#c62828",
                },
              }}
            >
              Giriş Yap
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
