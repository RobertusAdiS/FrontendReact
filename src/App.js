import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Product from "./components/Product";
import PrivateRoute from "./components/Private/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={Main} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<PrivateRoute element={Product} />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
