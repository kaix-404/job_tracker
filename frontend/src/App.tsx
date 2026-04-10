import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={(() => {
          const token = localStorage.getItem("token");
          return token ? <Dashboard /> : <Auth />;
        })()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;