import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  IconButton,
  TableContainer,
  Paper,
} from "@mui/material";
import { HiOutlinePencilSquare, HiPlusCircle } from "react-icons/hi2";
import KullaniciModal from "../modals/KullaniciModal";

const initialUsers = [
  { id: 1, email: "admin@example.com", rol: "yönetici", kullaniciAdi: "admin" },
  { id: 2, email: "user@example.com", rol: "kullanıcı", kullaniciAdi: "user" },
  {
    id: 3,
    email: "muhasebe@example.com",
    rol: "muhasebe",
    kullaniciAdi: "muhasebe",
  },
];

const Kullanicilar = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({
    email: "",
    rol: "",
    kullaniciAdi: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditValues({
      email: user.email,
      rol: user.rol,
      kullaniciAdi: user.kullaniciAdi,
    });
  };

  const handleSave = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              email: editValues.email,
              rol: editValues.rol,
              kullaniciAdi: editValues.kullaniciAdi,
            }
          : user
      )
    );
    setEditId(null);
    setEditValues({ email: "", rol: "", kullaniciAdi: "" });
  };

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleModalOpen = () => setModalOpen(true);

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3, color: "#d32f2f" }}>
          Kullanıcılar
        </Typography>
        <Button
          variant="contained"
          startIcon={<HiPlusCircle />}
          onClick={handleModalOpen}
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#c62828" },
            textTransform: "none",
          }}
        >
          Kullanıcı Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Kullanıcı Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Rol</strong>
              </TableCell>
              <TableCell>
                <strong>İşlem</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      size="small"
                      value={editValues.email}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      size="small"
                      value={editValues.kullaniciAdi}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          kullaniciAdi: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    user.kullaniciAdi
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <TextField
                      size="small"
                      value={editValues.rol}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          rol: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    user.rol
                  )}
                </TableCell>
                <TableCell>
                  {editId === user.id ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                      }}
                      onClick={() => handleSave(user.id)}
                    >
                      Kaydet
                    </Button>
                  ) : (
                    <IconButton
                      onClick={() => handleEdit(user)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <HiOutlinePencilSquare size={18} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <KullaniciModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleAddUser}
      />
    </Box>
  );
};

export default Kullanicilar;
