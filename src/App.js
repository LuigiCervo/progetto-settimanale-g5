import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./components/MainSearch";
import CityDetails from "./components/CityDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import MyFoot from "./components/MyFoot";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/weather" element={<CityDetails />} />
      </Routes>
      <MyFoot />
    </BrowserRouter>
  );
}

export default App;
