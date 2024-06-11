import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./api/AuthProvider";
import SignIn from "./components/Signin";
import MainPage from "./MainPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/about" element={<PublicRoute component={SignIn} />} />
          <Route path="/" element={<PrivateRoute component={MainPage} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
