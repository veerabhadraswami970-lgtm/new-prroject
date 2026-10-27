import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { AuthForm } from "../components/auth/AuthForm";

export const LoginPage: React.FC = () => {
  return (
    <PageContainer size="sm" className="flex items-center justify-center flex-1">
      <AuthForm mode="login" />
    </PageContainer>
  );
};
