import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthProvider from "./services/AuthProvider";
import SignIn from "./components/Auth/Signin";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MaterialListPage from "./pages/material/MaterialListPage";
import MaterialPage from "./pages/material/[id]";
import LogOut from "./components/Auth/LogOut";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container mx-auto">
          <nav className="mb-4">
            <ul className="flex space-x-4 justify-center">
              <li>
                <Link to="/about" className="text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/send" className="text-blue-500">
                  Send
                </Link>
              </li>
              <li>
                <LogOut />
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/about" element={<PublicRoute component={SignIn} />} />
            <Route
              path="/"
              element={<PrivateRoute component={MaterialListPage} />}
            />
            <Route
              path="/material/:id"
              element={<PrivateRoute component={MaterialPage} />}
            />
            <Route
              path="/send"
              element={<PrivateRoute component={MainPage} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
