import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProfileSetting from "./pages/ProfileSettings";
import EditarNombre from "./pages/EditarNombre";
import EditarUserName from "./pages/EditarUserName";
import EditarPassword from "./pages/EditarPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProfileSetting />} />
          <Route path="/name" element={<EditarNombre />} />
          <Route path="/username" element={<EditarUserName />} />
          <Route path="/password" element={<EditarPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
