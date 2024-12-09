import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";

import Anasayfa from "./pages/Anasayfa";
import Islemler from "./pages/Islemler";
import Login from "./pages/Login";
import Teklifler from "./pages/Teklifler";
import Cariler from "./pages/Cariler";
import Header from "./components/Header";
import Urunler from "./pages/Urunler";
import Doviz from "./pages/Doviz";
import Kategoriler from "./pages/Kategoriler";
import Ayarlar from "./pages/Ayarlar";
import Risturn from "./pages/Risturn";
import Kullanicilar from "./pages/Kullanicilar";
import TeklifEkle from "./pages/TeklifEkle";
import TeklifDuzenle from "./pages/TeklifDuzenle";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {!isLoginPage && <Header />}
      <Box display="flex" flexGrow={1}>
        <Box component="main" flexGrow={1} p={3}>
          <Routes>
            <Route>
              <Route path="/" element={<Anasayfa />} />
              <Route path="/islemler" element={<Islemler />} />
              <Route path="/teklifler" element={<Teklifler />} />
              <Route path="/teklif-ekle" element={<TeklifEkle />} />
              <Route path="/teklif-duzenle/:id" element={<TeklifDuzenle />} />
              <Route path="/cariler" element={<Cariler />} />
              <Route path="/urunler" element={<Urunler />} />
              <Route path="/doviz" element={<Doviz />} />
              <Route path="/kategoriler" element={<Kategoriler />} />
              <Route path="/ayarlar" element={<Ayarlar />} />
              <Route path="/risturn" element={<Risturn />} />
              <Route path="/kullanicilar" element={<Kullanicilar />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
