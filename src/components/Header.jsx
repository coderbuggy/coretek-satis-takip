import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const isActiveRoute = (path) => location.pathname === path;

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const managementOptions = [
    { label: "Ürünler", path: "/urunler" },
    { label: "Döviz", path: "/doviz" },
    { label: "Kategoriler", path: "/kategoriler" },
    { label: "Ayarlar", path: "/ayarlar" },
    { label: "Risturn", path: "/risturn" },
    { label: "Kullanıcılar", path: "/kullanicilar" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.8rem 2rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Kupa Bilişim | DMO
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {["/", "/teklifler", "/cariler"].map((route, index) => (
            <Button
              key={index}
              onClick={() => navigate(route)}
              sx={{
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "8px 20px",
                color: isActiveRoute(route) ? "#fff" : "#d32f2f",
                backgroundColor: isActiveRoute(route)
                  ? "#d32f2f"
                  : "transparent",

                textTransform: "none",
                transition: "all 0.3s ease",
              }}
            >
              {route === "/teklifler"
                ? "Teklifler"
                : route === "/cariler"
                ? "Cariler"
                : route === "/"
                ? "Anasayfa"
                : "İşlemler"}
            </Button>
          ))}

          {/* Yönetim Butonu */}
          <Button
            sx={{
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              color: "#d32f2f",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
            onMouseEnter={handleOpenMenu}
          >
            Yönetim Menüsü <HiChevronDown />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            onMouseLeave={handleCloseMenu}
            PaperProps={{
              style: {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              },
            }}
          >
            {managementOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleCloseMenu();
                  navigate(option.path);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                    color: "#d32f2f",
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
