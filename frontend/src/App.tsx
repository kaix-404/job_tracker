import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
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