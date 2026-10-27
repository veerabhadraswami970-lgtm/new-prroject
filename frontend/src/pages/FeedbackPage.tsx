import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { FeedbackForm } from "../components/feedback/FeedbackForm";

export const FeedbackPage: React.FC = () => {
  return (
    <PageContainer size="md">
      <FeedbackForm />
    </PageContainer>
  );
};
