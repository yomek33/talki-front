import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./services/AuthProvider";
import SignIn from "./components/Auth/Signin";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ArticleListPage from "./pages/article/ArticleListPage";
import ArticlePage from "./pages/article/[id]";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<PublicRoute component={SignIn} />} />
          <Route
            path="/"
            element={<PrivateRoute component={ArticleListPage} />}
          />
          <Route
            path="/article/:id"
            element={<PrivateRoute component={ArticlePage} />}
          />
          <Route path="/send" element={<PrivateRoute component={MainPage} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
