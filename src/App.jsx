import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Calculator from "./pages/Calculator";

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>

      <Footer />
    </main>
  );
}