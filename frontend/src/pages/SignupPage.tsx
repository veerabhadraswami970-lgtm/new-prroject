import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { AuthForm } from "../components/auth/AuthForm";

export const SignupPage: React.FC = () => {
  return (
    <PageContainer size="sm" className="flex items-center justify-center flex-1">
      <AuthForm mode="signup" />
    </PageContainer>
  );
};
