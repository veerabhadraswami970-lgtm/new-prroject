import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { MyFeedbackPage } from "./pages/MyFeedbackPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="my-feedback"
              element={
                <ProtectedRoute>
                  <MyFeedbackPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
