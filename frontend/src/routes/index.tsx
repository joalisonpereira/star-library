import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "src/pages/Login";
import Book from "src/pages/Book";
import Users from "src/pages/User";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<Book />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
